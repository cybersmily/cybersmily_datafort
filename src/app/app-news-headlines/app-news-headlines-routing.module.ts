import { AppHeadlinesFormComponent } from './app-headlines-form/app-headlines-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const headlineRoutes: Routes = [
  { path: '', component: AppHeadlinesFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(headlineRoutes)],
  exports: [RouterModule]
})
export class CpNewsHeadlinesRoutingModule { }
