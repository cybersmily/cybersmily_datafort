import { CpRedWeatherMainComponent } from './cp-red-weather-main/cp-red-weather-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const cpWeahterRoutes: Routes = [{
  path: '',
  component: CpRedWeatherMainComponent
}];

@NgModule({
  imports: [RouterModule.forChild(cpWeahterRoutes)],
  exports: [RouterModule]
})
export class AppCpRedWeatherRoutingModule { }
