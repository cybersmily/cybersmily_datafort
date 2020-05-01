import { SaveFileService } from './../shared/services/save-file.service';
import { FixerHotStuffService } from './../shared/services/fixer/fixer-hot-stuff.service';
import { FixerBigLeagueService } from './../shared/services/fixer/fixer-big-league.service';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';

import { AppFixerCalcRoutingModule } from './app-fixer-calc-routing.module';
import { FixerCalcMainComponent } from './fixer-calc-main/fixer-calc-main.component';
import { FixerCalcHotStuffComponent } from './fixer-calc-hot-stuff/fixer-calc-hot-stuff.component';
import { FixerCalcBigLeagueComponent } from './fixer-calc-big-league/fixer-calc-big-league.component';
import { FixerCalcHotStuffAreaComponent } from './fixer-calc-hot-stuff-area/fixer-calc-hot-stuff-area.component';
import { FixerCalcBigLeagueContactNewComponent } from './fixer-calc-big-league-contact-new/fixer-calc-big-league-contact-new.component';
import { FixerCalcBigLeagueContactComponent } from './fixer-calc-big-league-contact/fixer-calc-big-league-contact.component';


@NgModule({
  declarations: [
    FixerCalcMainComponent,
    FixerCalcHotStuffComponent,
    FixerCalcBigLeagueComponent,
    FixerCalcHotStuffAreaComponent,
    FixerCalcBigLeagueContactNewComponent,
    FixerCalcBigLeagueContactComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    AppFixerCalcRoutingModule
  ],
  providers: [
    FixerBigLeagueService,
    FixerHotStuffService,
    SaveFileService
  ]
})
export class AppFixerCalcModule {
}
