import { Cp2020NetrunGearModule } from '../shared/cp2020/cp2020-netrun-gear/cp2020-netrun-gear.module';
import { DataService } from './../shared/services/file-services';
import { PipesModule } from './../shared/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { CommonUiModule } from '../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppDeckManagerRoutingModule } from './app-deck-manager-routing.module';
import { DeckManagerMainComponent } from './deck-manager-main/deck-manager-main.component';
@NgModule({
  declarations: [
    DeckManagerMainComponent,
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    FormsModule,
    PipesModule,
    AppDeckManagerRoutingModule,
    Cp2020NetrunGearModule
  ],
  providers: [
    DataService
  ]
})
export class AppDeckManagerModule { }
