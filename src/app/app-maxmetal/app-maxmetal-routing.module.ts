import { MmgeneratorComponent } from './mmgenerator/mmgenerator.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const maxMetalroutes: Routes = [
  {
    path: '',
    component: MmgeneratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(maxMetalroutes)],
  exports: [RouterModule]
})
export class AppMaxmetalRoutingModule { }
