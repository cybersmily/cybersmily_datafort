import { NR_WORLD_MAP } from './../models/nr-constants';
import { NRRegion, NRCity } from '../models';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NrMapDataService } from '../services';

@Component({
    selector: 'cs-nrnavigator',
    templateUrl: './nrnavigator.component.html',
    styleUrls: ['./nrnavigator.component.css'],
    standalone: false
})
export class NrnavigatorComponent implements OnInit {

  regions: any[];
  cities: NRCity[];
  city: NRCity;
  region: NRRegion;

  constructor(
    private ngxService: NgxUiLoaderService,
    private nrMapDataService: NrMapDataService) { }

  ngOnInit() {
    this.nrMapDataService.castRegionList.subscribe(regionList => this.regions = regionList);
    this.cities = [];
  }

  onChangeRegion() {
    this.cities = this.nrMapDataService.cityList.GetCitiesForRegion(this.region.name);
    if (this.region.map === NR_WORLD_MAP) {
      this.cities = [];
    }
    this.city = null;
  }

  onGo() {
    this.ngxService.start();
    let mapName = '';
    if ( this.city && this.city.name !== '') {
      mapName = this.city.map;
    } else if (this.region) {
      mapName = this.region.map;
    } else {
      return;
    }
    this.nrMapDataService.GetMap(mapName);
  }
}
