import { CmbtZoneFormComponent } from './cmbt-zone-form/cmbt-zone-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const cmbtZoneRoutes: Routes = [{
  path: '',
  component: CmbtZoneFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(cmbtZoneRoutes)],
  exports: [RouterModule]
})
export class AppCmbtZoneGeneratorRoutingModule { }
