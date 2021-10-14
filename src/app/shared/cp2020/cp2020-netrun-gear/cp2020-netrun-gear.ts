import { PipesModule } from './../../pipes/pipes.module';
import { Cp2020DeckFormComponent } from './cp2020-deck-form/cp2020-deck-form.component';
import { Cp2020ProgramListComponent } from './cp2020-program-list/cp2020-program-list.component';
import { Cp2020ProgramNewComponent } from './cp2020-program-new/cp2020-program-new.component';
import { DiceService } from './../../services/dice/dice.service';
import { DataService } from './../../services/file-services/data.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    Cp2020ProgramNewComponent,
    Cp2020ProgramListComponent,
    Cp2020DeckFormComponent
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
    Cp2020DeckFormComponent
  ]
})
export class Cp2020NetrunGear { }
