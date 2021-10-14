import { PipesModule } from './../../pipes/pipes.module';
import { DeckFormComponent } from './deck-form/deck-form.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramNewComponent } from './program-new/program-new.component';
import { DiceService } from './../../services/dice/dice.service';
import { DataService } from './../../services/file-services/data.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ProgramNewComponent,
    ProgramListComponent,
    DeckFormComponent
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
    ProgramNewComponent,
    ProgramListComponent,
    DeckFormComponent
  ]
})
export class Cp2020NetrunGear { }
