import { DeckManagerMainComponent } from './deck-manager-main/deck-manager-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const nrProgramRoutes: Routes = [
  {
    path: '',
    component: DeckManagerMainComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(nrProgramRoutes)],
  exports: [RouterModule]
})
export class AppDeckManagerRoutingModule { }
