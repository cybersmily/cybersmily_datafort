import { PipesModule } from './../../pipes/pipes.module';
import { CyberDataService } from './../../services/data/cyber-data.service';
import { DiceService } from './../../services/dice/dice.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020CyberwareTableComponent } from './cp2020-cyberware-table/cp2020-cyberware-table.component';
import { Cp2020CyberwareSelectorComponent } from './cp2020-cyberware-selector/cp2020-cyberware-selector.component';
import { Cp2020CyberwareEditorComponent } from './cp2020-cyberware-editor/cp2020-cyberware-editor.component';



@NgModule({
  declarations: [
    Cp2020CyberwareTableComponent,
    Cp2020CyberwareSelectorComponent,
    Cp2020CyberwareEditorComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    PipesModule
  ],
  providers: [
    CyberDataService,
    DiceService
  ],
  exports: [
    Cp2020CyberwareTableComponent,
    Cp2020CyberwareSelectorComponent,
    Cp2020CyberwareEditorComponent
  ]
})
export class Cp2020CyberwareModule { }
