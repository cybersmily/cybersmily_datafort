import { DataListColumnParameters } from './../../shared/modules/data-list/models/data-list-parameters';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cp2020Cyberdeck } from './../../shared/cp2020/cp2020-netrun-gear/models/cp2020-cyberdeck';
import { JsonDataFiles } from './../../shared/services/file-services/json-data-files';
import { DataService } from './../../shared/services/file-services/dataservice/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cyberdeck-list',
  templateUrl: './cyberdeck-list.component.html',
  styleUrls: ['./cyberdeck-list.component.css'],
})
export class CyberdeckListComponent implements OnInit {
  deckList$: Observable<Array<Cp2020Cyberdeck>>;
  columns: Array<DataListColumnParameters> = [
    {
      header: 'name',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-4 col-md-2',
      sort: 'name',
    },
    {
      header: 'type',
      property: 'type',
      filters: 'filter',
      inputType: '',
      class: 'col-3 col-md-2',
      sort: 'type.name',
      filterValues: [
        { key: 'cellular', value: 'cellular' },
        { key: 'standard (new)', value: 'standard (new)' },
        { key: 'standard (used)', value: 'standard (used)' },
        { key: 'Portable', value: 'Portable' },
        { key: 'combat assault', value: 'combat assault' },
        { key: 'sealed combat assault', value: 'sealed combat assault' },
      ],
    },
    {
      header: 'spd',
      property: 'speed',
      filters: 'contains',
      inputType: 'text',
      class: 'col-2 d-none d-md-inline-block',
      sort: 'speed',
    },
    {
      header: 'mu',
      property: 'totalmu',
      filters: null,
      inputType: 'number',
      class: 'text-center col-1',
      sort: 'totalmu',
    },
    {
      header: 'cost',
      property: 'bookPrice',
      filters: null,
      inputType: 'number',
      class: 'text-center col-1',
      sort: 'bookPrice',
    },
    {
      header: 'source',
      property: 'source',
      filters: 'sourcebook',
      inputType: 'text',
      class: 'col-2 d-none d-md-inline-block',
      sort: 'source.book',
      isSourcebook: true,
    },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.deckList$ = this.dataService
      .GetJson(JsonDataFiles.CP2020_CYBERDECK_LIST_JSON)
      .pipe(
        map((data: Array<Cp2020Cyberdeck>) =>
          data.sort((a, b) => a.name.localeCompare(b.name))
        )
      );
  }
}
