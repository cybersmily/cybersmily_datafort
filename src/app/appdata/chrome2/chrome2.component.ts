import { JsonDataFiles } from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { Vehicle } from '../../shared/models/maxmetal';
import { DataService } from './../../shared/services/file-services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chrome2',
  templateUrl: './chrome2.component.html',
  styleUrls: ['./chrome2.component.css']
})
export class Chrome2Component implements OnInit {

  vehicleList: Vehicle[];
  title: string;
  updated: string;

  constructor(private dataService: DataService, private seo: SeoService) { }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Chrome 2 vehicles',
      '2001-09, Cybersmily\'s Datafort Cyberpunk 2020 Chrome 2 Vehicle updates. These vehicles have had Max Metal rules applied to them.'
    );
    this.title = 'Chrome 2 update to Maximum Metal Stats';
    this.updated = '2001-09';
    this.getVehicles();
  }

  private getVehicles(): void {
    this.dataService
      .GetJson(JsonDataFiles.CP2020_CHROME2_VEHICLE_JSON)
      .subscribe(
        resultObj => this.vehicleList = resultObj.vehicles,
        error => console.log( 'Error :: ' + error)
      );
  }

  public hasProp(val: any, prop: string): boolean {
    return typeof(val[prop]) !== 'undefined';
  }

}
