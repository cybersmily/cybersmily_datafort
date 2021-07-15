import { CPRedLifePathService } from './../shared/cpred/services/cpredlifepath/c-p-red-life-path.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCpRedLifepathRoutingModule } from './app-cp-red-lifepath-routing.module';
import { CpRedLifepathMainComponent } from './cp-red-lifepath-main/cp-red-lifepath-main.component';
import { CpRedLifepathJumpstartComponent } from './cp-red-lifepath-jumpstart/cp-red-lifepath-jumpstart.component';
import { CpRedLifepathCoreComponent } from './cp-red-lifepath-core/cp-red-lifepath-core.component';


@NgModule({
  declarations: [
    CpRedLifepathMainComponent,
    CpRedLifepathJumpstartComponent,
    CpRedLifepathCoreComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    AppCpRedLifepathRoutingModule
  ],
  providers: [
    CPRedLifePathService
  ]
})
export class AppCpRedLifepathModule { }
