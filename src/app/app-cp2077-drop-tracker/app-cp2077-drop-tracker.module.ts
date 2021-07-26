import { PipesModule } from './../shared/pipes/pipes.module';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { SaveFileService } from './../shared/services/file-services/save-file.service';
import { DataService } from './../shared/services/file-services/data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCp2077DropTrackerRoutingModule } from './app-cp2077-drop-tracker-routing.module';
import { Cp2077TrackerMainComponent } from './cp2077-tracker-main/cp2077-tracker-main.component';


@NgModule({
  declarations: [
    Cp2077TrackerMainComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    AppCp2077DropTrackerRoutingModule,
    PipesModule
  ],
  providers: [
    DataService,
    SaveFileService
  ]
})
export class AppCp2077DropTrackerModule { }
