import { CpPlayerWeapon, WeaponProperties, DataWeapon } from './../../../models/weapon';
import { WeaponDataService } from './../../../services/data/weapon-data.service';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020weapon-selector',
  templateUrl: './cp2020weapon-selector.component.html',
  styleUrls: ['./cp2020weapon-selector.component.css'],
})
export class Cp2020weaponSelectorComponent implements OnInit {
  faPlus = faPlus;
  faSave = faSave;

  wpnList = new Array<DataWeapon>();
  searchTerm = '';
  searchCategory = '';
  categories = WeaponProperties.categories;
  weaponTypes = WeaponProperties.types;
  availabilities = WeaponProperties.availabilities;
  concealments = WeaponProperties.concealments;
  reliabilites = WeaponProperties.reliabilites;

  selectedWeapons: Array<CpPlayerWeapon> = new Array<CpPlayerWeapon>();

  @Output()
  addWeapons: EventEmitter<Array<CpPlayerWeapon>> = new EventEmitter<
    Array<CpPlayerWeapon>
  >();

  constructor(private weaponData: WeaponDataService) {}

  ngOnInit(): void {
    this.weaponData.WeaponList.subscribe((data) => {
      data.sort((a, b) => {
        if (a.category === b.category) {
          if (a.subcategory === b.subcategory) {
            return a.name < b.name ? -1 : 1;
          }
          return a.subcategory < b.subcategory ? -1 : 1;
        }
        return a.category < b.category ? -1 : 1;
      });
      this.wpnList = data;
    });
  }

  isListEmpty(): boolean {
    return this.selectedWeapons.length < 1;
  }

  getCount(name: string): number {
    const index = this.selectedWeapons.findIndex((wpn) => wpn.name === name);
    if (index > -1 && this.selectedWeapons[index].count) {
      return this.selectedWeapons[index].count;
    }
    return 0;
  }

  saveList() {
    this.addWeapons.emit(this.selectedWeapons);
    this.selectedWeapons = new Array<CpPlayerWeapon>();
  }

  selected(e, name: string) {
    const index = this.selectedWeapons.findIndex((wpn) => wpn.name === name);
    if (e.target.value < 1) {
      this.selectedWeapons = new Array<CpPlayerWeapon>();
    } else if (index < 0) {
      const selected = this.wpnList.find((weapon) => weapon.name === name);
      const wpn = new CpPlayerWeapon(selected);
      wpn.count = 1;
      this.selectedWeapons.push(wpn);
    } else {
      this.selectedWeapons[index].count = parseInt(e.target.value, 10);
    }
  }
}
