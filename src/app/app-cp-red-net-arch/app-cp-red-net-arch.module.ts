import { SaveFileService } from './../shared/services/save-file.service';
import { FileLoaderService } from './../shared/services/file-loader/file-loader.service';
import { CPRedNetArchService } from './service/c-p-red-net-arch.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../shared/services/dice/dice.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSliderModule } from 'ngx-color/slider';

import { AppCpRedNetArchRoutingModule } from './app-cp-red-net-arch-routing.module';
import { NetArchMainComponent } from './net-arch-main/net-arch-main.component';
import { NetArchDiagramComponent } from './net-arch-diagram/net-arch-diagram.component';
import { NetArchNodeComponent } from './net-arch-node/net-arch-node.component';


@NgModule({
  declarations: [NetArchMainComponent, NetArchDiagramComponent, NetArchNodeComponent],
  imports: [
    CommonModule,
    CommonUiModule,
    ColorSliderModule,
    AppCpRedNetArchRoutingModule
  ],
  providers: [
    DiceService,
    CPRedNetArchService,
    FileLoaderService,
    SaveFileService
  ]
})
export class AppCpRedNetArchModule { }
