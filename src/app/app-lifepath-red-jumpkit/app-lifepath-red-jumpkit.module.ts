import { RedJumpkitLifepathService } from './../shared/services/lifepath/red-jumpkit-lifepath.service';
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
    FormsModule,
    AppLifepathRedJumpkitRoutingModule
  ],
  providers: [
    DiceService,
    RedJumpkitLifepathService
  ]
})
export class AppLifepathRedJumpkitModule { }
