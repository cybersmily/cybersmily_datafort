import { DataService } from './../shared/services/file-services/data.service';
import { DiceService } from './../shared/services/dice/dice.service';
import { Cp2020LifestyleModule } from './../shared/cp2020/cp2020-lifestyle/cp2020-lifestyle.module';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppBetaViewRoutingModule } from './app-beta-view-routing.module';
import { BetaViewMainComponent } from './beta-view-main/beta-view-main.component';


@NgModule({
  declarations: [BetaViewMainComponent],
  imports: [
    CommonUiModule,
    Cp2020LifestyleModule,
    CommonModule,
    AppBetaViewRoutingModule
  ],
  providers: [
    DiceService,
    DataService
  ]
})
export class AppBetaViewModule { }
