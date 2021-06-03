import { NightMarketFormComponent } from './night-market-form/night-market-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const nmRoutes: Routes = [{
  path: '', component: NightMarketFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(nmRoutes)],
  exports: [RouterModule]
})
export class AppNightMarketRoutingModule { }
