import { DataService } from './../../services/file-services/data.service';
import { DiceService } from './../../services/dice/dice.service';
import { PipesModule } from './../../pipes/pipes.module';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonUiModule,
    PipesModule
  ],
  providers: [
    DiceService,
    DataService
  ]
})
export class Cp2020LifepathModule { }
