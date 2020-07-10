import { FormsModule } from '@angular/forms';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppProgramGeneratorRoutingModule } from './app-program-generator-routing.module';
import { ProgramMainComponent } from './program-main/program-main.component';
import { ProgramNewComponent } from './program-new/program-new.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { DeckFormComponent } from './deck-form/deck-form.component';


@NgModule({
  declarations: [
    ProgramMainComponent,
    ProgramNewComponent,
    ProgramListComponent,
    DeckFormComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    FormsModule,
    AppProgramGeneratorRoutingModule
  ]
})
export class AppProgramGeneratorModule { }
