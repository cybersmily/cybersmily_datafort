import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmbtTrckMainComponent } from './cmbt-trck-main/cmbt-trck-main.component';

const cbtTrckRoutes: Routes = [{
  path: '',
  component: CmbtTrckMainComponent
}];

@NgModule({
  imports: [RouterModule.forChild(cbtTrckRoutes)],
  exports: [RouterModule]
})
export class AppCmbtTrackRoutingModule { }
