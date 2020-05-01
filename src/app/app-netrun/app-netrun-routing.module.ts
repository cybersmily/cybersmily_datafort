import { NrmainComponent } from './nrmain/nrmain.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const nrRoutes: Routes = [
  { path: '', component: NrmainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(nrRoutes)],
  exports: [RouterModule]
})
export class AppNetrunRoutingModule { }
