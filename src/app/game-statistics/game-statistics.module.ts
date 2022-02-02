import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../shared/services/dice/dice.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameStatisticsRoutingModule } from './game-statistics-routing.module';
import { Game2d10Component } from './game2d10/game2d10.component';


@NgModule({
  declarations: [
    Game2d10Component
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    GameStatisticsRoutingModule
  ],
  providers: [
    DiceService
  ]
})
export class GameStatisticsModule { }
