import { SourceBookList } from './../../shared/models/source-book-list';
import { WeaponDataService } from './../../shared/services/data/weapon-data.service';
import { Component, OnInit } from '@angular/core';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DataWeapon } from './../../shared/models/weapon/data-weapon';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'cs-admin-wpn-list',
  templateUrl: './admin-wpn-list.component.html',
  styleUrls: ['./admin-wpn-list.component.css']
})
export class AdminWpnListComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;

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
    console.log(this.newWeapon);
  }
}
