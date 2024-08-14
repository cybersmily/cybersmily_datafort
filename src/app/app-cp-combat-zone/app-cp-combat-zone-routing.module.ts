import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrCzMainFormComponent } from './cr-cz-main-form/cr-cz-main-form.component';


const crCZGenroutes: Routes = [
  {
    path: '',
    component: CrCzMainFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(crCZGenroutes)],
  exports: [RouterModule],
})


export class AppCpCombatZoneRoutingModule { }
