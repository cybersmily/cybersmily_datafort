import { GearCardComponent } from './gear-card/gear-card.component';
import { GearCardColumnComponent } from './gear-card-column/gear-card-column.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    GearCardComponent,
    GearCardColumnComponent
  ],
  declarations: [
    GearCardComponent,
    GearCardColumnComponent
  ]
})
export class GearModule { }
