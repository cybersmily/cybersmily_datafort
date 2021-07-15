import { CpRedLifepathMainComponent } from './cp-red-lifepath-main/cp-red-lifepath-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const redLifepathRoutes: Routes = [{
  path: '',
  component: CpRedLifepathMainComponent
}];

@NgModule({
  imports: [RouterModule.forChild(redLifepathRoutes)],
  exports: [RouterModule]
})
export class AppCpRedLifepathRoutingModule { }
