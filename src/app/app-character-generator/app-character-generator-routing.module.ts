import { AppCharacterGeneratorFormComponent } from './app-character-generator-form/app-character-generator-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const charGenRoutes: Routes = [{
  path: '',
  component: AppCharacterGeneratorFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(charGenRoutes)],
  exports: [RouterModule]
})
export class AppCharacterGeneratorRoutingModule { }
