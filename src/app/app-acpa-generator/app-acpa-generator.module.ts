import { DataService } from './../shared/services/file-services/dataservice/data.service';
import { SaveFileService } from './../shared/services/file-services/save-file/save-file.service';
import { FileLoaderService } from './../shared/services/file-services/file-loader/file-loader.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { Cp2020ACPAModule } from './../shared/cp2020/cp2020-acpa/cp2020-acpa.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppAcpaGeneratorRoutingModule } from './app-acpa-generator-routing.module';
import { AcpaGeneratorMainComponent } from './acpa-generator-main/acpa-generator-main.component';


@NgModule({
  declarations: [
    AcpaGeneratorMainComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    Cp2020ACPAModule,
    AppAcpaGeneratorRoutingModule
  ],
  providers: [
    FileLoaderService,
    SaveFileService,
    DataService
  ]
})
export class AppAcpaGeneratorModule { }
