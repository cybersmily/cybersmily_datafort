import { CpRedWeatherGeneratorService } from './services/cp-red-weather-generator.service';
import { PipesModule } from './../shared/pipes/pipes.module';
import { DiceService } from './../shared/services/dice/dice.service';
import { DataService } from './../shared/services/file-services';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCpRedWeatherRoutingModule } from './app-cp-red-weather-routing.module';
import { CpRedWeatherMainComponent } from './cp-red-weather-main/cp-red-weather-main.component';
import { MonthArrayPipe } from './pipes/month-array.pipe';


@NgModule({
  declarations: [
    CpRedWeatherMainComponent,
    MonthArrayPipe
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    AppCpRedWeatherRoutingModule,
    PipesModule
  ],
  providers: [
    DataService,
    DiceService,
    CpRedWeatherGeneratorService
  ]
})
export class AppCpRedWeatherModule { }
