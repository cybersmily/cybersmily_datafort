import { CP2020VehicleDataService } from './../../shared/cp2020/cp2020-vehicles/services/cp2020-vehicle-data.service';
import { VehicleData } from './../../shared/cp2020/cp2020-vehicles/models/vehicle-data';
import { Component, OnInit } from '@angular/core';
import { DataListColumnParameters } from './../../shared/modules/data-list/models/data-list-parameters';
import { Observable } from 'rxjs';
import { SeoService } from './../../shared/services/seo/seo.service';

@Component({
  selector: 'cs-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehicleList$: Observable<Array<VehicleData>>;

  columns: Array<DataListColumnParameters> = [
    {
      header: 'name',
      headerClass: 'col-4 col-md-2 text-xsmall',
      property: 'name',
      filters: 'contains',
      inputType: 'text',
      class: 'col-4 col-md-2  text-xsmall',
      sort: 'name',
    },
    {
      header: 'type',
      headerClass:
        'col-3 col-md-2 col-lg-1 text-xsmall text-center text-uppercase',
      property: 'type',
      filters: 'contains',
      inputType: 'text',
      class: 'col-3 col-md-2 col-lg-1 text-xxsmall text-center text-uppercase',
      sort: 'type',
    },
    {
      header: 'top speed',
      headerClass: 'd-none d-md-inline-block col text-xsmall text-center',
      property: 'topspeed',
      filters: null,
      inputType: 'text',
      class: 'd-none d-md-inline-block col text-xsmall text-center',
      sort: 'topspeed',
    },
    {
      header: 'acc',
      headerClass: 'col d-none d-md-inline-block text-xsmall text-center',
      property: 'accelerate',
      filters: null,
      inputType: 'text',
      class: 'col d-none d-md-inline-block text-xsmall text-center',
      sort: 'accelerate',
    },
    {
      header: 'dec',
      headerClass: 'col d-none d-md-inline-block text-xsmall text-center',
      property: 'decelerate',
      filters: null,
      inputType: 'text',
      class: 'col d-none d-md-inline-block text-xsmall text-center',
      sort: 'decelerate',
    },
    {
      header: 'crew',
      headerClass: 'col d-none d-md-inline-block text-xsmall text-center',
      property: 'crew',
      filters: null,
      inputType: 'text',
      class: 'col d-none d-md-inline-block text-xsmall text-center',
      sort: 'crew',
    },
    {
      header: 'range',
      headerClass: 'col d-none d-md-inline-block text-xsmall text-center',
      property: 'range',
      filters: null,
      inputType: 'text',
      class: 'col d-none d-md-inline-block text-xsmall text-center',
      sort: 'range',
    },
    {
      header: 'sdp',
      headerClass: 'col d-none d-md-inline-block text-xsmall text-center',
      property: 'sdp',
      filters: null,
      inputType: 'text',
      class: 'col d-none d-md-inline-block text-xsmall text-center',
      sort: 'sdp',
    },
    {
      header: 'sp',
      headerClass: 'col d-none d-md-inline-block text-xsmall text-center',
      property: 'sp',
      filters: null,
      inputType: 'text',
      class: 'col d-none d-md-inline-block text-xsmall text-center',
      sort: 'sp',
    },
    {
      header: 'Maneuver',
      headerClass: 'col d-none d-md-inline-block text-xsmall text-center',
      property: 'maneuver',
      filters: null,
      inputType: 'text',
      class: 'col d-none d-md-inline-block text-xsmall text-center',
      sort: 'maneuver',
    },
    {
      header: 'mass',
      headerClass: 'col d-none d-md-inline-block text-xsmall text-center',
      property: 'mass',
      filters: null,
      inputType: 'text',
      class: 'col d-none d-md-inline-block text-xsmall text-center',
      sort: 'mass',
    },
    {
      header: 'cost',
      headerClass: 'col text-xsmall',
      property: 'bookcost',
      filters: null,
      inputType: 'number',
      class: 'col text-xsmall',
      sort: 'bookcost',
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

  constructor(
    private vehicleDataService: CP2020VehicleDataService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Master Vehicle List',
      "2022-07, Cybersmily's Datafort Cyberpunk 2020 Master Vehicle List is a complied list of vehicles from Cyberpunk 2020 source books."
    );
    this.vehicleList$ = this.vehicleDataService.vehicleList;
  }
}
