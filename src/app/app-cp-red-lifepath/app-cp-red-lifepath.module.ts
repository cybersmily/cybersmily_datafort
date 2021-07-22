import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCpRedLifepathRoutingModule } from './app-cp-red-lifepath-routing.module';
import { CpRedLifepathMainComponent } from './cp-red-lifepath-main/cp-red-lifepath-main.component';
import { CPRedLifepathModule } from './../shared/cpred/c-p-red-lifepath/c-p-red-lifepath.module';


@NgModule({
  declarations: [
    CpRedLifepathMainComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    CPRedLifepathModule,
    AppCpRedLifepathRoutingModule
  ],
  providers: [
  ]
})
export class AppCpRedLifepathModule { }
