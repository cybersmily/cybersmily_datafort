import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppDrugLabRoutingModule } from './app-drug-lab-routing.module';
import { DrugLabMainComponent } from './drug-lab-main/drug-lab-main.component';
import { DrugLabGeneratorComponent } from './drug-lab-generator/drug-lab-generator.component';
import { DrugLabListComponent } from './drug-lab-list/drug-lab-list.component';


@NgModule({
  declarations: [DrugLabMainComponent, DrugLabGeneratorComponent, DrugLabListComponent],
  imports: [
    CommonModule,
    CommonUiModule,
    AppDrugLabRoutingModule
  ]
})
export class AppDrugLabModule { }
