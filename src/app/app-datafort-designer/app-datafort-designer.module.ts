import { Cp2020NetrunDatafortModule } from './../shared/cp2020/cp2020-netrun-datafort/cp2020-netrun-datafort.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppDatafortDesignerRoutingModule } from './app-datafort-designer-routing.module';
import { DatafortDesignerMainComponent } from './datafort-designer-main/datafort-designer-main.component';


@NgModule({
  declarations: [
    DatafortDesignerMainComponent
  ],
  imports: [
    CommonModule,
    Cp2020NetrunDatafortModule,
    AppDatafortDesignerRoutingModule
  ]
})
export class AppDatafortDesignerModule { }
