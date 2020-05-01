import { FixerCalcMainComponent } from './fixer-calc-main/fixer-calc-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const fixerRoutes: Routes = [
  {
    path: '',
    component: FixerCalcMainComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(fixerRoutes)],
  exports: [RouterModule]
})
export class AppFixerCalcRoutingModule { }
