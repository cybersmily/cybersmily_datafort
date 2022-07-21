import { GangGeneratorMainComponent } from './gang-generator-main/gang-generator-main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const gangGenRoutes: Routes = [
  {
    path: '',
    component: GangGeneratorMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(gangGenRoutes)],
  exports: [RouterModule],
})
export class AppGangGeneratorRoutingModule {}
