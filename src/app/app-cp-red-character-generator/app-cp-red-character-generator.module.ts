import { CpRedCharacterModule } from './../shared/cpred/cp-red-character/cp-red-character.module';
import {
  FileLoaderService,
  DataService,
  SaveFileService,
} from './../shared/services/file-services';
import { DiceService } from './../shared/services/dice/dice.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCpRedCharacterGeneratorRoutingModule } from './app-cp-red-character-generator-routing.module';
import { CpRedCharacterMainComponent } from './cp-red-character-main/cp-red-character-main.component';

@NgModule({
  declarations: [CpRedCharacterMainComponent],
  imports: [
    CommonModule,
    CommonUiModule,
    AppCpRedCharacterGeneratorRoutingModule,
    CpRedCharacterModule,
  ],
  providers: [DiceService, SaveFileService, DataService, FileLoaderService],
})
export class AppCpRedCharacterGeneratorModule {}
