import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { SeoService } from './../../shared/services/seo/seo.service';
import { WeaponDataService } from './../../shared/cp2020/cp2020weapons/services';
import { DataWeapon, WeaponProperties } from './../../shared/cp2020/cp2020weapons/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-wpn-list',
  templateUrl: './wpn-list.component.html',
  styleUrls: ['./wpn-list.component.css'],
})
export class WpnListComponent implements OnInit {
  faSortDown = faSortDown;
  faSortUp = faSortUp;

  wpnList: Array<DataWeapon> = new Array<DataWeapon>();
  categories = WeaponProperties.categories;
  weaponTypes = WeaponProperties.types;
  availabilities = WeaponProperties.availabilities;
  concealments = WeaponProperties.concealments;
  reliabilites = WeaponProperties.reliabilites;

  filters = {
    category: '',
    subcategory: '',
    name: '',
    type: '',
    source: '',
    conc: '',
    avail: '',
    rel: '',
    damage: '',
    ammo: ''
  };

  sortOrder = [
    {prop: 'category', desc: false},
    {prop: 'subcategory', desc: false},
    {prop: 'name', desc: false},
    {prop: 'type', desc: false},
    {prop: 'conc', desc: false},
    {prop: 'avail', desc: false},
    {prop: 'rel', desc: false},
    {prop: 'damage', desc: false},
    {prop: 'ammo', desc: false},
    {prop: 'wa', desc: false},
    {prop: 'shots', desc: false},
    {prop: 'rof', desc: false},
    {prop: 'cost', desc: false},
    {prop: 'range', desc: false}
  ];

  constructor(
    private wpnDataService: WeaponDataService,
    private seo: SeoService
  ) { }

  ngOnInit(): void {
    this.seo.updateMeta(
      'Cyberpunk 2020 Master Weapon List',
      "2020-09, Cybersmily's Datafort Cyberpunk 2020 Master Weapon List is a complied list of weapons from Cyberpunk 2020 source books."
    );
    this.wpnDataService.WeaponList.subscribe((list) => {
      this.wpnList = list;
    });
  }

  isSorted(property: string): boolean {
    return this.sortOrder.find( sort => sort.prop === property).desc;
  }

  toggleSort(property: string) {
    const index = this.sortOrder.findIndex( sort => sort.prop === property);
    this.sortOrder[index].desc = !this.sortOrder[index].desc;
    // reorder the list
    this.sortOrder.splice(0, 0, this.sortOrder.splice(index, 1)[0]);
    // force the pipe to re-evaluate
    const arr = this.sortOrder.filter(a => a.prop);
    this.sortOrder = arr;
  }
}
