import { CpRedDatingFormComponent } from './cp-red-dating-form/cp-red-dating-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const cpRedDatingRoutes: Routes = [{
  path: '',
  component: CpRedDatingFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(cpRedDatingRoutes)],
  exports: [RouterModule]
})
export class AppCpRedDatingRoutingModule { }
