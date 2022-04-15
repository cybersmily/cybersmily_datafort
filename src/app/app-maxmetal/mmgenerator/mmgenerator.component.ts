import { SeoService } from './../../shared/services/seo/seo.service';
import {
  DataService,
  JsonDataFiles,
} from './../../shared/services/file-services';
import { Component, OnInit } from '@angular/core';
import { VehicleType } from '../../shared/cp2020/cp2020-vehicles/models';

@Component({
  selector: 'cs-mmgenerator',
  templateUrl: './mmgenerator.component.html',
  styleUrls: ['./mmgenerator.component.css'],
})
export class MmgeneratorComponent implements OnInit {
  vehicleTypes: Array<VehicleType>;

  constructor(private data: DataService, private seo: SeoService) {
    this.vehicleTypes = [];
  }

  ngOnInit() {
    this.seo.updateMeta(
      'Cyberpunk 2020 Max Metal Generator',
      "2020-07, Cybersmily's Datafort Cyberpunk 2020 Max Metal Generator is an application to create vehicles in Cyberpunk 2020 using teh Maximum Metal sourcebook and rules."
    );
    this.loadMaxMetaldata();
  }

  loadMaxMetaldata() {
    // load the max metal data
    this.data
      .GetJson<{ baseTypes: Array<VehicleType> }>(
        JsonDataFiles.CP2020_MAXMETAL_TYPES_JSON
      )
      .subscribe((resp) => {
        this.vehicleTypes = resp.baseTypes;
      });
  }
}
