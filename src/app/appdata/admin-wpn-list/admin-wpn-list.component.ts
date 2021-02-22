import { CPRedWeapon } from './../../shared/models/weapon/c-p-red-weapon';
import { SourceBookList } from './../../shared/models/source-book-list';
import { WeaponDataService } from './../../shared/services/data/weapon-data.service';
import { Component, OnInit } from '@angular/core';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  DataWeapon,
  WeaponProperties
} from './../../shared/models/weapon';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'cs-admin-wpn-list',
  templateUrl: './admin-wpn-list.component.html',
  styleUrls: ['./admin-wpn-list.component.css']
})
export class AdminWpnListComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;
  isCollapse = true;

  categories = WeaponProperties.categories;
  weaponTypes = WeaponProperties.types;
  availabilities = WeaponProperties.availabilities;
  concealments = WeaponProperties.concealments;
  reliabilites = WeaponProperties.reliabilites;
  sources = new SourceBookList();

  completed = false;

  searchFilter = {
    category: '',
    subcategory: '',
    name: '',
    type: '',
    source: ''
  };

  weaponList: Array<DataWeapon> = new Array<DataWeapon>();
  categoryList: Array<KeyValue<string, Array<KeyValue<string, Array<DataWeapon>>>>>
  = new Array<KeyValue<string, Array<KeyValue<string, Array<DataWeapon>>>>>();

  newWeapon: DataWeapon = new DataWeapon({name: '', category: '', subcategory: '', source: {book: '', page: 0 }});
  selectedWeapon: DataWeapon = new DataWeapon({name: '', category: '', subcategory: '', source: {book: '', page: 0 }});

  sourcesList: Array<string> = new Array<string>();

  filterCompleted(page: number): boolean {
    if ( this.completed && page !== 0) {
      return false;
    }
    return true;
  }

  constructor(private weaponDataService: WeaponDataService) { }

  ngOnInit() {
    if (window.localStorage.getItem('AdminWpnFilters')) {
      this.searchFilter = JSON.parse(window.localStorage.getItem('AdminWpnFilters'));
    }
    this.weaponDataService.WeaponList
    .subscribe( data => {
      this.updateList(data);
    });

    this.weaponDataService.Sources.subscribe(
      data => this.sourcesList = data);
    }

  updateList(data: Array<DataWeapon>) {
    this.weaponList = data;
    this.categoryList = new Array<KeyValue<string, Array<KeyValue<string, Array<DataWeapon>>>>>();
    this.weaponList.map( wpn => {
      if (!this.categoryList.some(c => c.key === wpn.category)) {
          this.categoryList.push({
            key: wpn.category,
            value: [{ key: wpn.subcategory, value: [wpn]}]
          });
      } else {
        const index = this.categoryList.findIndex(c => c.key === wpn.category);
        const subIndex = this.categoryList[index].value.findIndex(sub => sub.key === wpn.subcategory)
        if (subIndex > -1) {
          this.categoryList[index].value[subIndex].value.push(wpn);
        } else {
          this.categoryList[index].value.push({key: wpn.subcategory, value: [wpn]});
        }
      }
    });
  }

  select(weaponName: string) {
    const wpn = this.weaponList.filter(w => w.name === weaponName)[0];
    this.selectedWeapon = (wpn) ? wpn : new DataWeapon({name: '', category: '', subcategory: '', source: {book: '', page: 0 }});
  }

  save() {
    this.weaponDataService.save();
  }

  edit() {
    this.weaponDataService.edit(this.selectedWeapon);
    this.weaponDataService.WeaponList
    .subscribe( data => {
      this.updateList(data);
    });
  }

  add() {
    this.weaponDataService.add(this.newWeapon);
    this.weaponDataService.WeaponList
    .subscribe( data => {
      this.updateList(data);
      this.newWeapon = new DataWeapon({name: '', category: '', subcategory: '', source: {book: '', page: 0 }});
    });
  }

  delete(weaponName: string, category: string) {
    const wpn = this.weaponList.filter(w => w.name === weaponName && w.category === category)[0];
    this.weaponDataService.delete(wpn);
    this.weaponDataService.WeaponList
    .subscribe( data => {
      this.updateList(data);
    });
  }

  savefilter() {
    window.localStorage.setItem('AdminWpnFilters', JSON.stringify(this.searchFilter));
  }

  changeSource() {
  }

  convertToRed() {
    const redWpnList: Array<CPRedWeapon> = this.weaponList.map( wpn => {
      const redWeapon: CPRedWeapon = {
        name: wpn.name,
        type: '',
        skill: '',
        damage: wpn.damage,
        quality: wpn.wa > 0 ? 'Excellent' : (wpn.rel === 'UR' ? 'Poor' : 'Standard'),
        concealability: true,
        hands: 1,
        rof: 1,
        cost: 1,
        magazine: 1,
        attachments: new Array<string>()
      };

      if (wpn.category.toLowerCase() === 'pistols') {
        redWeapon.skill = 'handgun';
        redWeapon.hands = 1;
        if ( wpn.subcategory.toLowerCase() === 'light' || wpn.subcategory.toLowerCase() === 'medium' ) {
          redWeapon.type = 'medium pistol';
          redWeapon.damage = '2d6';
          redWeapon.magazine = 12;
          redWeapon.rof = 2;
          redWeapon.hands = 1;
          redWeapon.concealability = true;
          redWeapon.cost = 50;
        }
        if ( wpn.subcategory.toLowerCase() === 'heavy') {
          redWeapon.type = 'heavy pistol';
          redWeapon.damage = '3d6';
          redWeapon.magazine = 8;
          redWeapon.rof = 2;
          redWeapon.concealability = true;
          redWeapon.cost = 100;
        }
        if ( wpn.subcategory.toLowerCase().startsWith('very') || wpn.subcategory.toLowerCase().startsWith('borg')) {
          redWeapon.type = 'very heavy pistol';
          redWeapon.damage = '4d6';
          redWeapon.magazine = 8;
          redWeapon.rof = 1;
          redWeapon.concealability = false;
          redWeapon.cost = 100;
        }
      }
      if (wpn.category.toLowerCase() === 'smg') {
        redWeapon.skill = 'handgun';
        redWeapon.hands = 1;
        redWeapon.rof = 1;
        redWeapon.cost = 100;
        if ( wpn.subcategory.toLowerCase() === 'heavy' || wpn.subcategory.toLowerCase().startsWith('borg') ) {
          redWeapon.type = 'heavy smg';
          redWeapon.damage = '3d6';
          redWeapon.magazine = 40;
          redWeapon.concealability = false;
        } else {
          redWeapon.type = 'smg';
          redWeapon.damage = '2d6';
          redWeapon.magazine = 30;
          redWeapon.concealability = true;
        }
      }
      if (wpn.category.toLowerCase() === 'rifles') {
        redWeapon.skill = 'shoulder arm';
        redWeapon.hands = 2;
        redWeapon.rof = 1;
        redWeapon.cost = 500;
        redWeapon.damage = '5d6';
        redWeapon.concealability = false;
        if (wpn.subcategory.toLowerCase() === 'sniper') {
          redWeapon.type = 'sniper rifle';
          redWeapon.magazine = 4;
        } else {
          redWeapon.type = 'assault rifle';
          redWeapon.magazine = 25;
        }
      }
      if (wpn.category.toLowerCase() === 'shotguns') {
        redWeapon.type = 'shotgun';
        redWeapon.magazine = 4;
        redWeapon.skill = 'shoulder arm';
        redWeapon.hands = 2;
        redWeapon.rof = 1;
        redWeapon.cost = 500;
        redWeapon.damage = '5d6';
        redWeapon.concealability = false;
      }
      if (wpn.subcategory.toLowerCase().includes('bows')) {
        redWeapon.type = 'bows & crossbows';
        redWeapon.magazine = 0;
        redWeapon.skill = 'archery';
        redWeapon.hands = 2;
        redWeapon.rof = 1;
        redWeapon.cost = 100;
        redWeapon.damage = '4d6';
        redWeapon.concealability = false;
      }

      return redWeapon;
    });
  }
}
