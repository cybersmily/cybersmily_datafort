import { CmbtZoneBuildingService } from './../shared/services/cmbt-zone/cmbt-zone-building.service';
import { CmbtZoneBlockService } from '../shared/services/cmbt-zone/cmbt-zone-block.service';
import { CmbtZoneStreetObjectService } from '../shared/services/cmbt-zone/cmbt-zone-street-object.service';
import { DataService } from './../shared/services/data.service';
import { DiceService } from './../shared/services/dice/dice.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCmbtZoneGeneratorRoutingModule } from './app-cmbt-zone-generator-routing.module';
import { CmbtZoneFormComponent } from './cmbt-zone-form/cmbt-zone-form.component';
import { CmbtZoneMapComponent } from './cmbt-zone-map/cmbt-zone-map.component';


@NgModule({
  declarations: [CmbtZoneFormComponent, CmbtZoneMapComponent],
  imports: [
    CommonModule,
    CommonUiModule,
    AppCmbtZoneGeneratorRoutingModule
  ],
  providers: [
    DiceService,
    DataService,
    CmbtZoneStreetObjectService,
    CmbtZoneBlockService,
    CmbtZoneBuildingService
  ]
})
export class AppCmbtZoneGeneratorModule { }
