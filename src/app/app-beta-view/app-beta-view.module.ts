import { Cp2020NetrunDatafortModule } from './../shared/cp2020/cp2020-netrun-datafort/cp2020-netrun-datafort.module';
import { DataService } from './../shared/services/file-services';
import { DiceService } from './../shared/services/dice/dice.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppBetaViewRoutingModule } from './app-beta-view-routing.module';
import { BetaViewMainComponent } from './beta-view-main/beta-view-main.component';


@NgModule({
  declarations: [BetaViewMainComponent],
  imports: [
    CommonUiModule,
    CommonModule,
    Cp2020NetrunDatafortModule,
    AppBetaViewRoutingModule
  ],
  providers: [
    DiceService,
    DataService
  ]
})
export class AppBetaViewModule { }
