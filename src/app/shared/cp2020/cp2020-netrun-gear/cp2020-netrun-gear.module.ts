import { Cp2020CyberdeckListComponent } from './cp2020-cyberdeck-list/cp2020-cyberdeck-list.component';
import { Cp2020CyberDeckSectionComponent } from './cp2020-cyber-deck-section/cp2020-cyber-deck-section.component';
import { Cp2020CyberdeckSelectorComponent } from './cp2020-cyberdeck-selector/cp2020-cyberdeck-selector.component';
import { PipesModule } from '../../pipes/pipes.module';
import { Cp2020CyberdeckFormComponent } from './cp2020-cyberdeck-form/cp2020-cyberdeck-form.component';
import { Cp2020ProgramListComponent } from './cp2020-program-list/cp2020-program-list.component';
import { Cp2020ProgramNewComponent } from './cp2020-program-new/cp2020-program-new.component';
import { DiceService } from '../../services/dice/dice.service';
import { DataService } from '../../services/file-services';
import { CommonUiModule } from '../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    Cp2020ProgramNewComponent,
    Cp2020ProgramListComponent,
    Cp2020CyberdeckFormComponent,
    Cp2020CyberdeckSelectorComponent,
    Cp2020CyberDeckSectionComponent,
    Cp2020CyberdeckListComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    PipesModule
  ],
  providers: [
    DataService,
    DiceService
  ],
  exports: [
    Cp2020ProgramNewComponent,
    Cp2020ProgramListComponent,
    Cp2020CyberdeckFormComponent,
    Cp2020CyberdeckSelectorComponent,
    Cp2020CyberDeckSectionComponent,
    Cp2020CyberdeckListComponent
  ]
})
export class Cp2020NetrunGearModule { }
