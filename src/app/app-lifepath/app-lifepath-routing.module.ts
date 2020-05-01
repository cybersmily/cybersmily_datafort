import { LifepathGeneratorComponent } from './../app-lifepath/lifepath-generator/lifepath-generator.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const lifepathRoutes: Routes = [
  {
    path: '',
    component: LifepathGeneratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(lifepathRoutes)],
  exports: [RouterModule]
})
export class AppLifepathRoutingModule { }
