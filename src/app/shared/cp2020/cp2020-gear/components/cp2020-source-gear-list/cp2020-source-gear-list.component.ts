import { Cp2020PlayerGear, Cp2020Gear} from './../../models';
import { Cp2020GearDataService } from './../../services/cp2020-gear-data/cp2020-gear-data.service';
import { Observable } from 'rxjs';
import { DataListColumnParameters } from './../../../../modules/data-list/models/data-list-parameters';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-cp2020-source-gear-list',
  templateUrl: './cp2020-source-gear-list.component.html',
  styleUrls: ['./cp2020-source-gear-list.component.css']
})
export class Cp2020SourceGearListComponent implements OnInit {


  @Output()
  selectedGear = new EventEmitter<Cp2020PlayerGear>();

  columns: Array<DataListColumnParameters> = [
    {
      header: 'category',
      headerClass: 'text-small col-3 d-none d-md-inline-block',
      property: 'category',
      filters: 'contains',
      inputType: 'text',
      class: 'col-3 text-xsmall d-none d-md-inline-block',
      sort: 'category',
    },
    {
      header: 'name',
      headerClass: 'text-small col-9 col-md-4',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-9 col-md-4 text-xsmall',
      sort: 'name',
    },
    {
      header: 'cost',
      headerClass: 'text-center col-3 col-md-2 text-small',
      property: 'cost',
      filters: null,
      inputType: 'text',
      class: 'text-center col-3 col-md-2 text-xsmall',
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

  gearList$: Observable<Array<Cp2020Gear>>;

  constructor(private gearDataService: Cp2020GearDataService) { }

  ngOnInit(): void {
    this.gearList$ = this.gearDataService.gearList;
  }

  select(gear: Cp2020Gear) {
    this.selectedGear.emit(new Cp2020PlayerGear(gear));
  }

}
