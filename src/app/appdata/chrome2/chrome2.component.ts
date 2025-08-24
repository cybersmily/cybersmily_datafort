import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JsonDataFiles } from './../../shared/services/file-services';
import { SeoService } from './../../shared/services/seo/seo.service';
import { VehicleData } from '../../shared/cp2020/cp2020-vehicles/models';
import { DataService } from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-chrome2',
    templateUrl: './chrome2.component.html',
    styleUrls: ['./chrome2.component.css'],
    standalone: false
})
export class Chrome2Component implements OnInit {
  vehicleList$: Observable<Array<VehicleData>>;
  title: string;
  updated: string;

  constructor(private dataService: DataService, private seo: SeoService) {}

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Chrome 2 vehicles',
      "2001-09, Cybersmily's Datafort Cyberpunk 2020 Chrome 2 Vehicle updates. These vehicles have had Max Metal rules applied to them."
    );
    this.title = 'Chrome 2 update to Maximum Metal Stats';
    this.updated = '2001-09';
    this.getVehicles();
  }

  private getVehicles(): void {
    this.vehicleList$ = this.dataService
      .GetJson<{ vehicles: Array<VehicleData> }>(
        JsonDataFiles.CP2020_CHROME2_VEHICLE_JSON
      )
      .pipe(map((data) => data.vehicles));
  }

  public hasProp(val: any, prop: string): boolean {
    return typeof val[prop] !== 'undefined';
  }
}
