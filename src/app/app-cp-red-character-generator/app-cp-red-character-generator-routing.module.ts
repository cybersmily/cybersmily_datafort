import { CpRedCharacterMainComponent } from './cp-red-character-main/cp-red-character-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const redCharGenroutes: Routes = [
  {
    path: '',
    component: CpRedCharacterMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(redCharGenroutes)],
  exports: [RouterModule],
})
export class AppCpRedCharacterGeneratorRoutingModule {}
