import { DatafortDesignerMainComponent } from './datafort-designer-main/datafort-designer-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const datfortDesignerRoutes: Routes = [{
  path: '',
  component: DatafortDesignerMainComponent
}];

@NgModule({
  imports: [RouterModule.forChild(datfortDesignerRoutes)],
  exports: [RouterModule]
})
export class AppDatafortDesignerRoutingModule { }
