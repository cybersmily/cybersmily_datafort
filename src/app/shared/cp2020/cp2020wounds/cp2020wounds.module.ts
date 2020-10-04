import { Cp2020WoundLevelComponent } from './cp2020-wound-level/cp2020-wound-level.component';
import { Cp2020SaveWoundsComponent } from './cp2020-save-wounds/cp2020-save-wounds.component';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    Cp2020SaveWoundsComponent,
    Cp2020WoundLevelComponent
  ],
  imports: [
    CommonUiModule,
    CommonModule
  ],
  exports: [
    Cp2020SaveWoundsComponent,
    Cp2020WoundLevelComponent
  ]
})
export class Cp2020WoundsModule { }
