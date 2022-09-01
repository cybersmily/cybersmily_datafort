import { PipesModule } from './../../pipes/pipes.module';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { FixerCalcHotStuffComponent } from './components/fixer-calc-hot-stuff/fixer-calc-hot-stuff.component';
import { FixerCalcHotStuffAreaComponent } from './components/fixer-calc-hot-stuff-area/fixer-calc-hot-stuff-area.component';
import { FixerCalcBigLeagueContactNewComponent } from './components/fixer-calc-big-league-contact-new/fixer-calc-big-league-contact-new.component';
import { FixerCalcBigLeagueContactComponent } from './components/fixer-calc-big-league-contact/fixer-calc-big-league-contact.component';
import { FixerCalcBigLeagueComponent } from './components/fixer-calc-big-league/fixer-calc-big-league.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FixerCalcBigLeagueComponent,
    FixerCalcBigLeagueContactComponent,
    FixerCalcBigLeagueContactNewComponent,
    FixerCalcHotStuffAreaComponent,
    FixerCalcHotStuffComponent,
  ],
  imports: [CommonModule, CommonUiModule, PipesModule],
  exports: [
    FixerCalcBigLeagueComponent,
    FixerCalcBigLeagueContactComponent,
    FixerCalcBigLeagueContactNewComponent,
    FixerCalcHotStuffAreaComponent,
    FixerCalcHotStuffComponent,
  ],
})
export class Cp2020ContactsModule {}
