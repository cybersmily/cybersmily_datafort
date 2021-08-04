import { Cp2020LifepathModule } from './../shared/cp2020/cp2020-lifepath/cp2020-lifepath.module';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { DataService } from './../shared/services/file-services/data.service';
import {
  EthnicityGeneratorService,
  LifeEventsGeneratorService,
  FamilyGeneratorService,
  StyleGeneratorService,
  MotivationGeneratorService,
  LifePathGeneratorService
 } from '../shared/cp2020/cp2020-lifepath/services';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLifepathRoutingModule } from './app-lifepath-routing.module';
import { LifepathGeneratorComponent } from './lifepath-generator/lifepath-generator.component';
import { DiceService } from '../shared/services/dice/dice.service';

@NgModule({
  imports: [
    CommonModule,
    CommonUiModule,
    Cp2020LifepathModule,
    AppLifepathRoutingModule
  ],
  declarations: [
    LifepathGeneratorComponent
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
