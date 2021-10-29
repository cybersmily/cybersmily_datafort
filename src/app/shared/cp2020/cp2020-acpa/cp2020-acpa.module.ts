import { Cp2020ACPADetailsComponent } from './cp2020-acpa-details/cp2020-acpa-details.component';
import { Cp2020ACPADataAttributesService } from './services';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    Cp2020ACPADetailsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    Cp2020ACPADataAttributesService
  ]
})
export class Cp2020ACPAModule { }
