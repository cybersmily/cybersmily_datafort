import { DataListColumnParameters } from './../../../modules/data-list/models/data-list-parameters';
import { Observable } from 'rxjs';
import { Cp2020PlayerCyber, DataCyberware } from './../models';
import { CyberDataService } from './../services';
import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'cs-cp2020-cyberware-selector',
    templateUrl: './cp2020-cyberware-selector.component.html',
    styleUrls: ['./cp2020-cyberware-selector.component.css'],
    standalone: false
})
export class Cp2020CyberwareSelectorComponent implements OnInit {

  columns: Array<DataListColumnParameters> = [
    {
      header: 'type',
      headerClass: 'text-small col-3 col-md-2',
      property: 'type',
      filters: 'filter',
      inputType: '',
      class: 'col-3 col-md-2 text-small',
      sort: 'type',
      filterValues: [
        { key: 'BIOWARE', value: 'Bioware' },
        { key: 'BODY PLATING', value: 'Body Plating' },
        { key: 'CHIPWARE', value: 'Chipware' },
        { key: 'CYBERAUDIO', value: 'Cyberaudio' },
        { key: 'CYBERFOOT', value: 'Cyberfoot' },
        { key: 'CYBERHAND', value: 'Cyberhand' },
        { key: 'CYBERLIMB', value: 'Cyberlimb' },
        { key: 'CYBERNETIC SYSTEM', value: 'Cybernetic System' },
        { key: 'CYBEROPTIC', value: 'Cyberoptic' },
        { key: 'CYBERVOCAL', value: 'Cybervocal' },
        { key: 'CYBERWEAPON', value: 'Cyberweapon' },
        { key: 'EXOTIC BODYSCULPT', value: 'Exotic Bodysculpt' },
        { key: 'FASHIONWARE', value: 'Fashionware' },
        { key: 'FULL CONVERSION', value: 'Full Conversion' },
        { key: 'IMPLANT', value: 'Implant' },
        { key: 'LINEAR FRAMES', value: 'Linear Frames' },
        { key: 'NEURALWARE', value: 'Neuralware' },
      ],
    },
    {
      header: 'name',
      headerClass: 'text-small col-7',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-7 text-xsmall',
      sort: 'name',
    },
    {
      header: 'cost',
      headerClass: 'text-center col-2 col-md-1 text-small',
      property: 'cost',
      filters: null,
      inputType: 'number',
      class: 'text-center col-2 col-md-1 text-xsmall',
      sort: 'cost',
    },
    {
      header: 'source',
      headerClass: 'col-2 d-none d-md-inline-block text-small',
      property: 'source',
      filters: 'sourcebook',
      inputType: 'text',
      class: 'col-2 d-none d-md-inline-block text-xsmall text-truncate',
      sort: 'source.book',
      isSourcebook: true,
    },
  ];

  cyberwareList$: Observable<Array<DataCyberware>>;


  @Output()
  addCyberware: EventEmitter<Cp2020PlayerCyber> = new EventEmitter<Cp2020PlayerCyber>();

  constructor(private cyberDataService: CyberDataService) { }

  ngOnInit(): void {
    this.cyberwareList$ = this.cyberDataService
    .cp2020CyberwareList;
  }

select(cyberware:DataCyberware ): void {
  this.addCyberware.emit(new Cp2020PlayerCyber(cyberware, true));
}

}
