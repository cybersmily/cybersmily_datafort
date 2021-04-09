import { NetArchMainComponent } from './net-arch-main/net-arch-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const redNetTempRoutes: Routes = [{
  path: '',
  component: NetArchMainComponent
}];

@NgModule({
  imports: [RouterModule.forChild(redNetTempRoutes)],
  exports: [RouterModule]
})
export class AppCpRedNetArchRoutingModule { }
