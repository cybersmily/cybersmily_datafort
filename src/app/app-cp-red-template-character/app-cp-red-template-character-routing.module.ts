import { TempGeneratorComponent } from './temp-generator/temp-generator.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const cprTempRoutes: Routes = [{
  path: '',
  component: TempGeneratorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(cprTempRoutes)],
  exports: [RouterModule]
})
export class AppCpRedTemplateCharacterRoutingModule { }
