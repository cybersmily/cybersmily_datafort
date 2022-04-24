import { DataListColumnParameters } from './../../shared/modules/data-list/models/data-list-parameters';
import { SeoService } from './../../shared/services/seo/seo.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProgramOption } from './../../shared/cp2020/cp2020-netrun-gear/models/program-option';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { Component, OnInit } from '@angular/core';
import { Program } from '../../shared/cp2020/cp2020-netrun-gear/models';

@Component({
  selector: 'cs-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css'],
})
export class ProgramListComponent implements OnInit {
  programList$: Observable<Array<Program>>;
  columns: Array<DataListColumnParameters> = [
    {
      header: 'class',
      headerClass: 'col-2 text-small',
      property: 'class',
      filters: 'filter',
      inputType: '',
      class: 'col-2 text-small',
      sort: 'class',
      filterValues: [
        { key: 'alarm', value: 'Alarm' },
        { key: 'ambush', value: 'Ambush' },
        { key: 'anti-personnel', value: 'Anti-Personnel' },
        { key: 'anti-program', value: 'Anti-Program' },
        { key: 'anti-system', value: 'Anti-System' },
        { key: 'compiler', value: 'Compiler' },
        { key: 'controller', value: 'Controller' },
        { key: 'detection', value: 'detection' },
        { key: 'evasion', value: 'Evasion' },
        { key: 'intrusion', value: 'Intrusion' },
        { key: 'protection', value: 'Protection' },
        { key: 'rache specials', value: 'Rache Specials' },
        { key: 'special', value: 'Special' },
        { key: 'stealth', value: 'Stealth' },
        { key: 'systemware', value: 'Systemware' },
        { key: 'transportation', value: 'Transportation' },
        { key: 'Utility', value: 'Utility' },
      ],
    },
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
      header: 'str',
      headerClass: 'col-1 text-center text-small',
      property: 'str',
      filters: 'contains',
      inputType: 'text',
      class: 'col-1 text-center text-small',
      sort: 'str',
    },
    {
      header: 'mu',
      headerClass: 'col-1 text-center text-small',
      property: 'mu',
      filters: 'contains',
      inputType: 'number',
      class: 'text-center col-1 text-small',
      sort: 'mu',
    },
    {
      header: 'cost',
      headerClass: 'col-1 text-center text-small',
      property: 'cost',
      filters: null,
      inputType: 'number',
      class: 'text-center col-1 text-small',
      sort: 'cost',
    },
    {
      header: 'options',
      headerClass: 'col-2 text-center text-small',
      property: 'options',
      filters: 'contains',
      inputType: 'array',
      class: 'text-center col-2 text-xsmall',
    },
    {
      header: 'source',
      headerClass: 'col-2 text-small',
      property: 'source',
      filters: 'sourcebook',
      inputType: 'text',
      class: 'col-2 text-xsmall',
      sort: 'source.book',
      isSourcebook: true,
    },
  ];

  constructor(private dataService: DataService, private seo: SeoService) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.seo.updateMeta(
      'Cyberpunk 2020 Program List',
      "2022-03, Cybersmily's Datafort Cyberpunk 2020 Program List from all sources and search capability."
    );

    this.programList$ = this.dataService
      .GetJson<Array<any>>(JsonDataFiles.CP2020_PROGRAM_LIST_JSON)
      .pipe(map((data) => data.sort((a, b) => a.class.localeCompare(b.class))));
  }
}
