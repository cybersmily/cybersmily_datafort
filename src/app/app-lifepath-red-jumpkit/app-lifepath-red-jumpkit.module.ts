import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { CPRedCharacterPDFService } from './../shared/cpred/services/cprcharpdf/c-p-red-character-p-d-f.service';
import { RedJumpkitLifepathService } from '../shared/cpred/services/cprlifepath/red-jumpkit-lifepath.service';
import { DiceService } from './../shared/services/dice/dice.service';
import { FormsModule } from '@angular/forms';
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
    RedJumpkitLifepathService,
    CPRedCharacterPDFService
  ]
})
export class AppLifepathRedJumpkitModule { }
