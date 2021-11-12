import { AcpaGeneratorMainComponent } from './acpa-generator-main/acpa-generator-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const acpaGeneratorRoutes: Routes = [{
  path: '',
  component: AcpaGeneratorMainComponent
}];

@NgModule({
  imports: [RouterModule.forChild(acpaGeneratorRoutes)],
  exports: [RouterModule]
})
export class AppAcpaGeneratorRoutingModule { }
