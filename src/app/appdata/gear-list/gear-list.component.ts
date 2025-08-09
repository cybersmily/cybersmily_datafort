import { KeyValue } from '@angular/common';
import { Cp2020Gear } from '../../shared/cp2020/cp2020-gear/models';
import { DataListColumnParameters } from './../../shared/modules/data-list/models/data-list-parameters';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { map } from 'rxjs/operators';
import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'cs-gear-list',
    templateUrl: './gear-list.component.html',
    styleUrls: ['./gear-list.component.css'],
    standalone: false
})
export class GearListComponent implements OnInit {
  gearList$: Observable<Array<Cp2020Gear>>;
  columns: Array<DataListColumnParameters> = [
    {
      header: 'category',
      headerClass: 'col-3 col-md-2 text-small',
      property: 'category',
      filters: 'filter',
      inputType: '',
      class: 'col-3 col-md-2 text-small text-truncate',
      sort: 'category',
      filterValues: [
        { key: 'ARMOR/CLOTHING', value: 'Armor/Clothing' },
        { key: 'COMMUNICATION', value: 'COMMUNICATION' },
        { key: 'COMPUTER', value: 'COMPUTER' },
        { key: 'COMPUTER OPTION', value: 'COMPUTER OPTION' },
        { key: 'CYBERDECK OPTION', value: 'CYBERDECK OPTION' },
        { key: 'CYBERFORM', value: 'CYBERFORM' },
        { key: 'CYBERFORM OPTION', value: 'CYBERFORM OPTION' },
        { key: 'DEMOLITION', value: 'DEMOLITION' },
        { key: 'DRUGS', value: 'DRUGS' },
        { key: 'ENTERTAINMENT', value: 'ENTERTAINMENT' },
        { key: 'FOOD & DRINK', value: 'FOOD & DRINK' },
        { key: 'FURNITURE', value: 'FURNITURE' },
        { key: 'HOUSING', value: 'HOUSING' },
        { key: 'LIFESTYLE', value: 'LIFESTYLE' },
        { key: 'MEDIA EQUIPMENT', value: 'MEDIA EQUIPMENT' },
        { key: 'MEDICAL', value: 'MEDICAL' },
        { key: 'MILITARY EQUIPMENT', value: 'MILITARY EQUIPMENT' },
        { key: 'MUSICAL EQUIPMENT', value: 'MUSICAL EQUIPMENT' },
        { key: 'NAUTICAL GEAR', value: 'NAUTICAL GEAR' },
        { key: 'PERSONAL ELECTRONICS', value: 'PERSONAL ELECTRONICS' },
        { key: 'PHONE UPGRADES', value: 'PHONE UPGRADES' },
        { key: 'REMOTE/DRONES', value: 'REMOTE/DRONES' },
        { key: 'SECURITY', value: 'SECURITY' },
        { key: 'SPACE GEAR', value: 'SPACE GEAR' },
        { key: 'SURVEILLANCE', value: 'SURVEILLANCE' },
        { key: 'SURVIVAL GEAR', value: 'SURVIVAL GEAR' },
        { key: 'TOOLS', value: 'TOOLS' },
        { key: 'TRANSPORT', value: 'TRANSPORT' },
        { key: 'WEAPON ACCESSORY', value: 'WEAPON ACCESSORY' },
      ],
    },
    {
      header: 'name',
      headerClass: 'col-4 col-md-3 text-small',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-4 col-md-3 text-small',
      sort: 'name',
    },
    {
      header: 'notes',
      headerClass: 'col-3 d-none d-md-inline-block text-center text-xsmall',
      property: 'notes',
      filters: null,
      inputType: 'text',
      class: 'text-center col-3 d-none d-md-inline-block text-xsmall',
    },
    {
      header: 'wt',
      headerClass: 'col-1 d-none d-md-inline-block text-center text-small',
      property: 'wt',
      filters: null,
      inputType: 'number',
      class: 'text-center col-1 d-none d-md-inline-block text-small',
      sort: 'wt',
    },
    {
      header: 'cost',
      headerClass: 'col-2 col-md-1 text-center text-small',
      property: 'cost',
      filters: null,
      inputType: 'number',
      class: 'col-2 col-md-1 text-center text-small',
      sort: 'cost',
    },
    {
      header: 'source',
      headerClass: 'col-3 col-md-2 text-xsmall',
      property: 'source',
      filters: 'sourcebook',
      inputType: 'text',
      class: 'col-3 col-md-2 text-xsmall',
      sort: 'source.book',
      isSourcebook: true,
    },
  ];

  constructor(private seo: SeoService, private dataService: DataService) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.seo.updateMeta(
      'Cyberpunk 2020 Gear List',
      "2022-05, Cybersmily's Datafort Cyberpunk 2020 Gear List from all sources and search capability."
    );
    this.gearList$ = this.dataService.GetJson(
      JsonDataFiles.CP2020_GEAR_DATA_LIST_JSON
    );
  }
}
