import { NetArchFormComponent } from './net-arch-form/net-arch-form.component';
import { NetArchMainComponent } from './net-arch-main/net-arch-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const redNetTempRoutes: Routes = [{
  path: '',
  component: NetArchMainComponent
}, {
  path: 'new',
  component: NetArchFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(redNetTempRoutes)],
  exports: [RouterModule]
})
export class AppCpRedNetArchRoutingModule { }
