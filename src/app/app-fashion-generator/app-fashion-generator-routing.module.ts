import { FashionGeneratorComponent } from './fashion-generator/fashion-generator.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const fashionRoutes: Routes = [
  {
    path: 'apps/fashcalc',
    component: FashionGeneratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(fashionRoutes)],
  exports: [RouterModule]
})
export class AppFashionGeneratorRoutingModule { }
