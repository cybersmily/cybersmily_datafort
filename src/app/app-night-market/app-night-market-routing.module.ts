import { EconomyFormComponent } from './economy-form/economy-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const nmRoutes: Routes = [{
  path: '', component: EconomyFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(nmRoutes)],
  exports: [RouterModule]
})
export class AppNightMarketRoutingModule { }
