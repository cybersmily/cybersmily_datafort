import { CPRedLifePathService } from './../shared/cpred/services/cpredlifepath/c-p-red-life-path.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { CPRedCharacterPDFService } from './../shared/cpred/services/cprcharpdf/c-p-red-character-p-d-f.service';
import { DiceService } from './../shared/services/dice/dice.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLifepathRedJumpkitRoutingModule } from './app-lifepath-red-jumpkit-routing.module';
import { AppLifepathRedJumpkitComponent } from './app-lifepath-red-jumpkit/app-lifepath-red-jumpkit.component';

@NgModule({
  declarations: [
    AppLifepathRedJumpkitComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    AppLifepathRedJumpkitRoutingModule
  ],
  providers: [
    DiceService,
    CPRedLifePathService,
    CPRedCharacterPDFService
  ]
})
export class AppLifepathRedJumpkitModule { }
