import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GangDisplayComponent } from './components/gang-display/gang-display.component';
import { GangGeneratorDisplayComponent } from './components/gang-generator-display/gang-generator-display.component';



@NgModule({
  declarations: [
    GangDisplayComponent,
    GangGeneratorDisplayComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GangGeneratorModule { }
