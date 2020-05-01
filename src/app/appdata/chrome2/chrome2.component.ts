import { Vehicle } from '../../shared/models/maxmetal';
import { DataService } from './../../shared/services/data.service';
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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.title = 'Chrome 2 update to Maximum Metal Stats';
    this.updated = '2001-09';
    this.getVehicles();
  }

  private getVehicles(): void {
    this.dataService
      .GetJson('/json/data/ch2conversion.json')
      .subscribe(
        resultObj => this.vehicleList = resultObj.vehicles,
        error => console.log( 'Error :: ' + error)
      );
  }

  public hasProp(val: any, prop: string): boolean {
    return typeof(val[prop]) !== 'undefined';
  }

}
