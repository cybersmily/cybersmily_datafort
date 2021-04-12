import { ArmorDataService } from './../../services/data/armor-data.service';
import { DiceService } from './../../services/dice/dice.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020ArmorTableComponent } from './cp2020-armor-table/cp2020-armor-table.component';



@NgModule({
  declarations: [
    Cp2020ArmorTableComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule
  ],
  providers: [
    DiceService,
    ArmorDataService
  ],
  exports: [
    Cp2020ArmorTableComponent
  ]
})
export class Cp2020ArmorModule { }
