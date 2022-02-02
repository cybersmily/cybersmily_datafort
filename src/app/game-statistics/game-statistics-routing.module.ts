import { Game2d10Component } from './game2d10/game2d10.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const statisticsRoutes: Routes = [{
  path: '',
  component: Game2d10Component
}];

@NgModule({
  imports: [RouterModule.forChild(statisticsRoutes)],
  exports: [RouterModule]
})
export class GameStatisticsRoutingModule { }
