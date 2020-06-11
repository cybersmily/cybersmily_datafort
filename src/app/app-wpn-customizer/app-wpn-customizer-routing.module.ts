import { WpnCustomizerMainComponent } from './wpn-customizer-main/wpn-customizer-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const wpnRoutes: Routes = [
  { path: '', component: WpnCustomizerMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(wpnRoutes)],
  exports: [RouterModule]
})
export class AppWpnCustomizerRoutingModule { }
