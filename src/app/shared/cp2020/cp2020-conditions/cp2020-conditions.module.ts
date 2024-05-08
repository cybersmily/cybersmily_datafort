import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020ConditionListComponent } from './components/cp2020-condition-list/cp2020-condition-list.component';
import { Cp2020CharacterConditionComponent } from './models/cp2020-character-condition/cp2020-character-condition.component';



@NgModule({
  declarations: [
    Cp2020ConditionListComponent,
    Cp2020CharacterConditionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class Cp2020ConditionsModule { }
