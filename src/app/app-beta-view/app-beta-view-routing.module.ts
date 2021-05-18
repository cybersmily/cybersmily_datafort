import { BetaViewMainComponent } from './beta-view-main/beta-view-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const betaRoutes: Routes = [{
  path: '',
  component: BetaViewMainComponent

}];

@NgModule({
  imports: [RouterModule.forChild(betaRoutes)],
  exports: [RouterModule]
})
export class AppBetaViewRoutingModule { }
