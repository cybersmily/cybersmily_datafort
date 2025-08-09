import { SeoService } from './../../shared/services/seo/seo.service';
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
    standalone: false
})
export class CyberdeckListComponent implements OnInit {
  deckList$: Observable<Array<Cp2020Cyberdeck>>;
  columns: Array<DataListColumnParameters> = [
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
      header: 'type',
      headerClass: 'col-3 d-none d-md-inline-block text-small',
      property: 'chassis',
      filters: 'filter',
      inputType: '',
      class: 'col-3 d-none d-md-inline-block text-small',
      sort: 'chassis',
      filterValues: [
        { key: 'cellular', value: 'cellular' },
        { key: 'standard (new)', value: 'standard (new)' },
        { key: 'standard (used)', value: 'standard (used)' },
        { key: 'portable', value: 'portable' },
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
      headerClass: 'col-2 col-md-1 text-center text-small',
      property: 'bookPrice',
      filters: null,
      inputType: 'number',
      class: 'text-center col-2 col-md-1 text-small',
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

  constructor(private dataService: DataService, private seo: SeoService) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.seo.updateMeta(
      'Cyberpunk 2020 Cyberdeck List',
      "2022-03, Cybersmily's Datafort Cyberpunk 2020 Cyberdeck List from all sources and search capability."
    );
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
