import { DataService } from './../shared/services/file-services/data.service';
import { PipesModule } from './../shared/pipes/pipes.module';
import { SourcebookPipe } from './../shared/pipes/sourcebook.pipe';
import { FormsModule } from '@angular/forms';
import { CommonUiModule } from '../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppDeckManagerRoutingModule } from './app-deck-manager-routing.module';
import { DeckManagerMainComponent } from './deck-manager-main/deck-manager-main.component';
import { ProgramNewComponent } from './program-new/program-new.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { DeckFormComponent } from './deck-form/deck-form.component';


@NgModule({
  declarations: [
    DeckManagerMainComponent,
    ProgramNewComponent,
    ProgramListComponent,
    DeckFormComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    FormsModule,
    PipesModule,
    AppDeckManagerRoutingModule
  ],
  providers: [
    DataService
  ]
})
export class AppDeckManagerModule { }
