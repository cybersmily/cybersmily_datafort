import { AppLifepathRedJumpkitComponent } from './app-lifepath-red-jumpkit/app-lifepath-red-jumpkit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const lifepathRedJumpRoutes: Routes = [{
  path: '',
  component: AppLifepathRedJumpkitComponent
}];

@NgModule({
  imports: [RouterModule.forChild(lifepathRedJumpRoutes)],
  exports: [RouterModule]
})
export class AppLifepathRedJumpkitRoutingModule { }
