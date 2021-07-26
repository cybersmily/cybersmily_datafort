import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cp2077TrackerMainComponent } from './cp2077-tracker-main/cp2077-tracker-main.component';

const cp2077Trckerroutes: Routes = [{
  path: '',
  component: Cp2077TrackerMainComponent
}];

@NgModule({
  imports: [RouterModule.forChild(cp2077Trckerroutes)],
  exports: [RouterModule]
})
export class AppCp2077DropTrackerRoutingModule { }
