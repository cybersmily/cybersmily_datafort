import { DrugLabMainComponent } from './drug-lab-main/drug-lab-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const drugRoutes: Routes = [
  { path: '', component: DrugLabMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(drugRoutes)],
  exports: [RouterModule]
})
export class AppDrugLabRoutingModule { }
