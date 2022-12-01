import { map, Observable } from 'rxjs';
import { DataListColumnParameters } from './../../../modules/data-list/models/data-list-parameters';
import { ArmorDataListService } from './../services/armor-data-list/armor-data-list.service';
import { Cp2020ArmorPiece } from './../models/cp2020-armor-piece';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-source-armor-list',
  templateUrl: './cp2020-source-armor-list.component.html',
  styleUrls: ['./cp2020-source-armor-list.component.css'],
})
export class Cp2020SourceArmorListComponent implements OnInit {
  columns: Array<DataListColumnParameters> = [
    {
      header: 'name',
      headerClass: 'text-small col-6',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-6 text-xsmall',
      sort: 'name',
    },
    {
      header: 'sp',
      headerClass: 'text-center col-1 text-small',
      property: 'baseSP',
      filters: null,
      inputType: 'number',
      class: 'text-center col-1 text-xsmall',
      sort: 'baseSP',
    },
    {
      header: 'ev',
      headerClass: 'text-center col-1 text-small',
      property: 'ev',
      filters: null,
      inputType: 'number',
      class: 'text-center col-1 text-xsmall',
      sort: 'ev',
    },
    {
      header: 'cost',
      headerClass: 'text-center col-1 text-small',
      property: 'cost',
      filters: null,
      inputType: 'text',
      class: 'text-center col-1 text-xsmall',
      sort: 'cost',
    },
    {
      header: 'source',
      headerClass: 'col-3 d-none d-md-inline-block text-small',
      property: 'source',
      filters: 'sourcebook',
      inputType: 'text',
      class: 'col-3 d-none d-md-inline-block text-xsmall',
      sort: 'source.book',
      isSourcebook: true,
    },
  ];

  armorList$: Observable<Array<Cp2020ArmorPiece>>;

  @Output()
  selectedArmor = new EventEmitter<Cp2020ArmorPiece>();

  constructor(private armorDataListService: ArmorDataListService) {}

  ngOnInit(): void {
    this.armorList$ = this.armorDataListService.getData();
  }

  select(armor: Cp2020ArmorPiece) {
    this.selectedArmor.emit(new Cp2020ArmorPiece(armor));
  }

  getLocations(armor: Cp2020ArmorPiece) {
    if (armor.clothes.loc !== '') {
      return armor.clothes.loc;
    }
    return Object.keys(armor.locations)
      .filter((loc) => !loc.startsWith('l'))
      .map((loc) => {
        if (loc.startsWith('r')) {
          return loc.substring(1) + 's';
        }
        return loc;
      })
      .join('|');
  }
}
