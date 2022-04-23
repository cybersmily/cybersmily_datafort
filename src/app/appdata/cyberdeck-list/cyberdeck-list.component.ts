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
      headerClass: 'col-3 text-small',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-3 text-small',
      sort: 'name',
    },
    {
      header: 'type',
      headerClass: 'col-3 text-small',
      property: 'type.name',
      filters: 'filter',
      inputType: '',
      class: 'col-3 text-small',
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
      headerClass: 'col-1 text-center text-small',
      property: 'speed',
      filters: 'contains',
      inputType: 'text',
      class: 'col-1 text-center text-small',
      sort: 'speed',
    },
    {
      header: 'mu',
      headerClass: 'col-1 text-center text-small',
      property: 'totalMU',
      filters: null,
      inputType: 'number',
      class: 'text-center col-1 text-small',
      sort: 'totalMU',
    },
    {
      header: 'cost',
      headerClass: 'col-1 text-center text-small',
      property: 'bookPrice',
      filters: null,
      inputType: 'number',
      class: 'text-center col-1 text-small',
      sort: 'bookPrice',
    },
    {
      header: 'source',
      headerClass: 'col-3 text-small',
      property: 'source',
      filters: 'sourcebook',
      inputType: 'text',
      class: 'col-3 text-small',
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
          data
            .map((deck) => new Cp2020Cyberdeck(deck))
            .sort((a, b) => a.name.localeCompare(b.name))
        )
      );
  }
}
