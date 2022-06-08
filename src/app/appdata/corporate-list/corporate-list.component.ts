import { CorporationDataService } from './../../shared/services/corporation-data/corporation-data.service';
import { CorporationData } from './../../shared/models/corporation/corporation-data';
import { DataListColumnParameters } from '../../shared/modules/data-list/models/data-list-parameters';
import { SeoService } from '../../shared/services/seo/seo.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cs-corporate-list',
  templateUrl: './corporate-list.component.html',
  styleUrls: ['./corporate-list.component.css'],
})
export class CorporateListComponent implements OnInit {
  corporateList$: Observable<Array<CorporationData>>;

  columns: Array<DataListColumnParameters> = [
    {
      header: 'name',
      headerClass: 'col-3 text-small',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-3 text-small',
      sort: 'name',
    },
    {
      header: 'Industry',
      headerClass: 'col-3 text-center text-small',
      property: 'industry',
      filters: 'contains',
      inputType: 'text',
      class: 'text-center col-3 text-xsmall',
    },
    {
      header: 'Headquarters',
      headerClass: 'col-2 text-center text-small',
      property: 'hq',
      filters: 'contains',
      inputType: 'text',
      class: 'text-center col-2 text-xsmall',
    },
    {
      header: 'version',
      headerClass: 'col-1 text-center text-small',
      property: 'version',
      filters: 'filter',
      inputType: 'text',
      class: 'col-1 text-center text-xsmall',
      sort: 'version',
      filterValues: [
        { key: 'cyberpunk 2020', value: 'cyberpunk 2020' },
        { key: 'cyberpunk red', value: 'cyberpunk red' },
      ],
    },
    {
      header: 'source',
      headerClass: 'col-2 text-xsmall',
      property: 'source',
      filters: 'sourcebook',
      inputType: 'text',
      class: 'col-2 text-xsmall',
      sort: 'source.book',
      isSourcebook: true,
    },
  ];

  constructor(
    private seo: SeoService,
    private corpService: CorporationDataService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.seo.updateMeta(
      'Cyberpunk 2020/Red Corporation List',
      "2022-06, Cybersmily's Datafort Corporation list for Cyberpunk 2020 and Cyberpunk Red from all sources and search capability."
    );
    this.corporateList$ = this.corpService.corporations;
  }
}
