import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { DataService } from './../shared/services/file-services/data.service';
import {
  EthnicityGeneratorService,
  LifeEventsGeneratorService,
  FamilyGeneratorService,
  StyleGeneratorService,
  MotivationGeneratorService,
  LifePathGeneratorService
 } from '../shared/services/lifepath';
import { LifepathChartComponent } from './lifepath-chart/lifepath-chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLifepathRoutingModule } from './app-lifepath-routing.module';
import { LifepathGeneratorComponent } from './lifepath-generator/lifepath-generator.component';
import { LifepathFamilyComponent } from './lifepath-family/lifepath-family.component';
import { LifepathEventsComponent } from './lifepath-events/lifepath-events.component';
import { LifepathEthnicityComponent } from './lifepath-ethnicity/lifepath-ethnicity.component';
import { FormsModule } from '@angular/forms';
import { DiceService } from '../shared/services/dice/dice.service';

@NgModule({
  imports: [
    CommonModule,
    CommonUiModule,
    FormsModule,
    AppLifepathRoutingModule
  ],
  declarations: [
    LifepathGeneratorComponent,
    LifepathFamilyComponent,
    LifepathEventsComponent,
    LifepathChartComponent,
    LifepathEthnicityComponent
  ],
  providers: [
    DiceService,
    DataService,
    FamilyGeneratorService,
    LifeEventsGeneratorService,
    EthnicityGeneratorService,
    StyleGeneratorService,
    MotivationGeneratorService,
    LifePathGeneratorService
  ]
})
export class AppLifepathModule { }
