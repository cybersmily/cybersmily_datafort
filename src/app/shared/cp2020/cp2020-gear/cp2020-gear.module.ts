import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020GearListComponent } from './components/cp2020-gear-list/cp2020-gear-list.component';
import { Cp2020GearDataComponent } from './services/cp2020-gear-data/cp2020-gear-data.component';



@NgModule({
  declarations: [
    Cp2020GearListComponent,
    Cp2020GearDataComponent
  ],
  imports: [
    CommonModule
  ]
})
export class Cp2020GearModule { }
