import { CPRedStatsModule } from './../shared/cpred/c-p-red-stats/c-p-red-stats.module';
import { FileLoaderService } from './../shared/services/file-services/file-loader.service';
import { DataService } from './../shared/services/file-services/data.service';
import { SaveFileService } from './../shared/services/file-services/save-file.service';
import { DiceService } from './../shared/services/dice/dice.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCpRedCharacterGeneratorRoutingModule } from './app-cp-red-character-generator-routing.module';
import { CpRedCharacterMainComponent } from './cp-red-character-main/cp-red-character-main.component';
import { CpRedCharacterCyberComponent } from './cp-red-character-cyber/cp-red-character-cyber.component';
import { CpRedCharacterSkillsComponent } from './cp-red-character-skills/cp-red-character-skills.component';
import { CpRedCharacterLifepathComponent } from './cp-red-character-lifepath/cp-red-character-lifepath.component';
import { CpRedCharacterGearComponent } from './cp-red-character-gear/cp-red-character-gear.component';
import { CpRedCharacterWeaponsArmorComponent } from './cp-red-character-weapons-armor/cp-red-character-weapons-armor.component';
import { CpRedCharacterImprovementComponent } from './cp-red-character-improvement/cp-red-character-improvement.component';
import { CpRedCharacterLifestyleComponent } from './cp-red-character-lifestyle/cp-red-character-lifestyle.component';
import { CpRedCharacterWoundsComponent } from './cp-red-character-wounds/cp-red-character-wounds.component';


@NgModule({
  declarations: [
    CpRedCharacterMainComponent,
    CpRedCharacterCyberComponent,
    CpRedCharacterSkillsComponent,
    CpRedCharacterLifepathComponent,
    CpRedCharacterGearComponent,
    CpRedCharacterWeaponsArmorComponent,
    CpRedCharacterImprovementComponent,
    CpRedCharacterLifestyleComponent,
    CpRedCharacterWoundsComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    AppCpRedCharacterGeneratorRoutingModule,
    CPRedStatsModule
  ],
  providers: [
    DiceService,
    SaveFileService,
    DataService,
    FileLoaderService
  ]
})
export class AppCpRedCharacterGeneratorModule { }
