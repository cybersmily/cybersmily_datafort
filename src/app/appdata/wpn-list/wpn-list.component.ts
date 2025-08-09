import { DataListColumnParameters } from './../../shared/modules/data-list/models/data-list-parameters';
import { Observable } from 'rxjs';
import { SeoService } from './../../shared/services/seo/seo.service';
import { WeaponDataService } from './../../shared/cp2020/cp2020weapons/services';
import {
  DataWeapon,
  WeaponProperties,
} from './../../shared/cp2020/cp2020weapons/models';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-wpn-list',
    templateUrl: './wpn-list.component.html',
    styleUrls: ['./wpn-list.component.css'],
    standalone: false
})
export class WpnListComponent implements OnInit {
  wpnList$: Observable<Array<DataWeapon>>;
  availabilities = WeaponProperties.availabilities;
  concealments = WeaponProperties.concealments;
  reliabilites = WeaponProperties.reliabilites;

  columns: Array<DataListColumnParameters> = [
    {
      header: 'category',
      headerClass: 'col-2 d-none d-md-inline-block text-xsmall',
      property: 'category',
      filters: 'filter',
      filterValues: WeaponProperties.categories.map((cat) => ({
        key: cat,
        value: cat,
      })),
      inputType: 'text',
      class: 'col-2 d-none d-md-inline-block text-xsmall',
      sort: 'category',
    },
    {
      header: 'subcategory',
      headerClass: 'col-1 d-none d-md-inline-block text-xsmall',
      property: 'subcategory',
      filters: 'contains',
      inputType: 'text',
      class: 'col-1 d-none d-md-inline-block text-xsmall',
      sort: 'subcategory',
    },
    {
      header: 'name',
      headerClass: 'col-3 col-md-2 text-xsmall',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-3 col-md-2 text-small',
      sort: 'name',
    },
    {
      header: 'type',
      headerClass: 'col text-xsmall text-center',
      property: 'type',
      filters: 'filter',
      filterValues: WeaponProperties.types.map((t) => ({
        key: t.code,
        value: t.name,
      })),
      inputType: 'text',
      class: 'col text-xsmall text-center',
      sort: 'type',
    },
    {
      header: 'wa',
      headerClass: 'col text-xsmall text-center',
      property: 'wa',
      filters: 'contains',
      inputType: 'text',
      class: 'col text-xsmall text-center',
      sort: 'wa',
    },
    {
      header: 'conc.',
      headerClass: 'col d-none d-md-inline-block text-xsmall text-center',
      property: 'conc',
      filters: 'filter',
      filterValues: WeaponProperties.concealments.map((t) => ({
        key: t.code,
        value: t.name,
      })),
      inputType: 'text',
      class: 'col d-none d-md-inline-block text-xsmall text-center',
      sort: 'conc',
    },
    {
      header: 'avail.',
      headerClass: 'col d-none d-md-inline-block text-xsmall text-center',
      property: 'avail',
      filters: 'filter',
      filterValues: WeaponProperties.availabilities.map((t) => ({
        key: t.code,
        value: t.name,
      })),
      inputType: 'text',
      class: 'col d-none d-md-inline-block text-xsmall text-center',
      sort: 'avail',
    },
    {
      header: 'dmg',
      headerClass: 'col text-xsmall',
      property: 'damage',
      filters: 'contains',
      inputType: 'text',
      class: 'col text-small',
      sort: 'damage',
    },
    {
      header: 'Shots',
      headerClass: 'col text-xsmall',
      property: 'shots',
      filters: 'contains',
      inputType: 'text',
      class: 'col text-small',
      sort: 'shots',
    },
    {
      header: 'rof',
      headerClass: 'col text-xsmall',
      property: 'rof',
      filters: 'contains',
      inputType: 'text',
      class: 'col text-small',
      sort: 'rof',
    },
    {
      header: 'cost',
      headerClass: 'col text-xsmall',
      property: 'cost',
      filters: null,
      inputType: 'number',
      class: 'col text-small',
      sort: 'cost',
    },
    {
      header: 'rel.',
      headerClass: 'col text-xsmall text-center',
      property: 'rel',
      filters: 'filter',
      filterValues: WeaponProperties.reliabilites.map((t) => ({
        key: t.code,
        value: t.name,
      })),
      inputType: 'text',
      class: 'col text-xsmall text-center',
      sort: 'rel',
    },
    {
      header: 'source',
      headerClass: 'col-2 d-none d-md-inline-block text-xsmall',
      property: 'source',
      filters: 'sourcebook',
      inputType: 'text',
      class: 'col-2 d-none d-md-inline-block text-xsmall',
      sort: 'source.book',
      isSourcebook: true,
    },
  ];

  constructor(
    private wpnDataService: WeaponDataService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Master Weapon List',
      "2020-09, Cybersmily's Datafort Cyberpunk 2020 Master Weapon List is a complied list of weapons from Cyberpunk 2020 source books."
    );
    this.wpnList$ = this.wpnDataService.WeaponList;
  }
}
