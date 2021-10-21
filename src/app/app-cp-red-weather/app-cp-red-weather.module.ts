import { PipesModule } from './../shared/pipes/pipes.module';
import { DiceService } from './../shared/services/dice/dice.service';
import { DataService } from './../shared/services/file-services/data.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCpRedWeatherRoutingModule } from './app-cp-red-weather-routing.module';
import { CpRedWeatherMainComponent } from './cp-red-weather-main/cp-red-weather-main.component';


@NgModule({
  declarations: [
    CpRedWeatherMainComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    AppCpRedWeatherRoutingModule,
    PipesModule
  ],
  providers: [
    DataService,
    DiceService
  ]
})
export class AppCpRedWeatherModule { }
