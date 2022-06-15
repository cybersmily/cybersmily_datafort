import { ClubNameGeneratorService } from './services/clubb-name-generator/club-name-generator.service';
import { DiceService } from './../../services/dice/dice.service';
import { CommonUiModule } from './../common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubberDisplayComponent } from './components/clubber-display/clubber-display.component';
import { ClubDisplayComponent } from './components/club-display/club-display.component';
import { ClubChartDataService, ClubGeneratorService } from './services';

@NgModule({
  declarations: [ClubberDisplayComponent, ClubDisplayComponent],
  imports: [CommonModule, CommonUiModule],
  exports: [ClubberDisplayComponent, ClubDisplayComponent],
  providers: [
    DiceService,
    ClubChartDataService,
    ClubGeneratorService,
    ClubNameGeneratorService,
  ],
})
export class ClubGeneratorModule {}
