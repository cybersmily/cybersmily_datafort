import { DataListColumnParameters } from './../../shared/modules/data-list/models/data-list-parameters';
import { DataWeapon } from './../../shared/cp2020/cp2020weapons/models/data-weapon';
import { WeaponProperties } from './../../shared/cp2020/cp2020weapons/models/weapon-properties';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JsonDataFiles } from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { WeaponGroup } from '../../shared/cp2020/cp2020weapons/models';
import { DataService } from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moreguns',
  templateUrl: './moreguns.component.html',
  styleUrls: ['./moreguns.component.css'],
})
export class MoregunsComponent implements OnInit {
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
      filterValues: [
        { key: 'PISTOL', value: 'Pistol' },
        { key: 'RIFLE', value: 'Rifle' },
        { key: 'SHOTGUN', value: 'Shotgun' },
        { key: 'SMG', value: 'Submachinegun' },
      ],
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
      inputType: 'number',
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
      header: 'ammo',
      headerClass: 'col text-xsmall',
      property: 'ammo',
      filters: 'contains',
      inputType: 'text',
      class: 'col text-small',
      sort: 'ammo',
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
      inputType: 'number',
      class: 'col text-small',
      sort: 'shots',
    },
    {
      header: 'rof',
      headerClass: 'col text-xsmall',
      property: 'rof',
      filters: 'contains',
      inputType: 'number',
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
  ];

  constructor(private dataService: DataService, private seo: SeoService) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.seo.updateMeta(
      'Cyberpunk 2020 More Guns',
      "2020-07, Cybersmily's Datafort Cyberpunk 2020 More Guns is a complied list of guns from The Edge of the Sword Vol 1 and Solo of Fortune."
    );
    this.wpnList$ = this.dataService.GetJson<Array<DataWeapon>>(
      JsonDataFiles.CP2020_MORE_GUNS_JSON
    );
  }
}
