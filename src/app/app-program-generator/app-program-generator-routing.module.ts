import { ProgramMainComponent } from './program-main/program-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const nrProgramRoutes: Routes = [
  {
    path: '',
    component: ProgramMainComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(nrProgramRoutes)],
  exports: [RouterModule]
})
export class AppProgramGeneratorRoutingModule { }
