import { DataService } from './../shared/services/file-services/data.service';
import { DiceService } from './../shared/services/dice/dice.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppNightMarketRoutingModule } from './app-night-market-routing.module';
import { NightMarketFormComponent } from './night-market-form/night-market-form.component';


@NgModule({
  declarations: [NightMarketFormComponent],
  imports: [
    CommonModule,
    CommonUiModule,
    AppNightMarketRoutingModule
  ],
  providers: [
    DiceService,
    DataService
  ]
})
export class AppNightMarketModule { }
