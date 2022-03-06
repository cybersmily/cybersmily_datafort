import { DiceService } from './../../services/dice/dice.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020StatsComponent } from './cp2020-stats/cp2020-stats.component';
import { Cp2020StatComponent } from './cp2020-stat/cp2020-stat.component';
import { Cp2020InitiativeEditorComponent } from './cp2020-initiative-editor/cp2020-initiative-editor.component';



@NgModule({
  declarations: [
    Cp2020StatsComponent,
    Cp2020StatComponent,
    Cp2020InitiativeEditorComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule
  ],
  providers: [
    DiceService
  ],
  exports: [
    Cp2020StatsComponent,
    Cp2020StatComponent
  ]
})
export class Cp2020StatsModule { }
