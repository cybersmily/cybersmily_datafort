import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { VehicleType } from '../../shared/models/maxmetal';

@Component({
  selector: 'cs-mmgenerator',
  templateUrl: './mmgenerator.component.html',
  styleUrls: ['./mmgenerator.component.css']
})
export class MmgeneratorComponent implements OnInit {

  vehicleTypes: VehicleType[];

  constructor(private data: DataService) {
    this.vehicleTypes = [];
  }

  ngOnInit() {
    this.loadMaxMetaldata();
  }

  loadMaxMetaldata() {
    // load the max metal data
    this.data.GetJson('json/apps/maxmetal/mmTypes.json').subscribe(resp => {
      this.vehicleTypes = resp.baseTypes;
    });
  }

}
