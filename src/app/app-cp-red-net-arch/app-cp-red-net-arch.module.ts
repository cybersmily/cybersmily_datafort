import { NetArchNodeComponent } from './net-arch-node/net-arch-node.component';
import { FileLoaderService, SaveFileService } from './../shared/services/file-services';
import { CPRedNetArchService } from './service/c-p-red-net-arch.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { DiceService } from './../shared/services/dice/dice.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorSliderModule } from 'ngx-color/slider';

import { ColorChromeModule } from 'ngx-color/chrome';

import { AppCpRedNetArchRoutingModule } from './app-cp-red-net-arch-routing.module';
import { NetArchMainComponent } from './net-arch-main/net-arch-main.component';
import { NetArchDiagramComponent } from './net-arch-diagram/net-arch-diagram.component';
import { NetArchInstructionsComponent } from './net-arch-instructions/net-arch-instructions.component';
import { NetArchNodeSvgComponent } from './net-arch-node-svg/net-arch-node-svg.component';
import { NetArchSettingsComponent } from './net-arch-settings/net-arch-settings.component';
import { NetArchNewNodeComponent } from './net-arch-new-node/net-arch-new-node.component';


@NgModule({
  declarations: [
    NetArchMainComponent,
    NetArchDiagramComponent,
    NetArchInstructionsComponent,
    NetArchNodeComponent,
    NetArchNodeSvgComponent,
    NetArchSettingsComponent,
    NetArchNewNodeComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    ColorSliderModule,
    ColorChromeModule,
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
