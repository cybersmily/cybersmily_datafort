import { DataService } from './../shared/services/file-services';
import { DiceService } from './../shared/services/dice/dice.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppNightMarketRoutingModule } from './app-night-market-routing.module';
import { NightMarketFormComponent } from './night-market-form/night-market-form.component';
import { VenditFormComponent } from './vendit-form/vendit-form.component';
import { BodegasFormComponent } from './bodegas-form/bodegas-form.component';
import { EconomyFormComponent } from './economy-form/economy-form.component';


@NgModule({
  declarations: [NightMarketFormComponent, VenditFormComponent, BodegasFormComponent, EconomyFormComponent],
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
