import { CPRedLifePathService } from './../shared/cpred/services/cpredlifepath/c-p-red-life-path.service';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { NameGeneratorService } from './../shared/services/namegen/name-generator.service';
import { CpRedTemplateGeneratorService } from '../shared/cpred/services/cpredpc/cp-red-template-generator.service';
import { DiceService } from './../shared/services/dice/dice.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCpRedTemplateCharacterRoutingModule } from './app-cp-red-template-character-routing.module';
import { TempGeneratorComponent } from './temp-generator/temp-generator.component';
import { TempGeneratorSkillsComponent } from './temp-generator-skills/temp-generator-skills.component';
import { TempGeneratorWeaponsComponent } from './temp-generator-weapons/temp-generator-weapons.component';
import { TempGeneratorGearComponent } from './temp-generator-gear/temp-generator-gear.component';
import { TempGeneratorLifepathComponent } from './temp-generator-lifepath/temp-generator-lifepath.component';
import { TempGeneratorStatsComponent } from './temp-generator-stats/temp-generator-stats.component';
import { TempGeneratorArmorComponent } from './temp-generator-armor/temp-generator-armor.component';

@NgModule({
  declarations: [
    TempGeneratorComponent,
    TempGeneratorSkillsComponent,
    TempGeneratorWeaponsComponent,
    TempGeneratorGearComponent,
    TempGeneratorLifepathComponent,
    TempGeneratorStatsComponent,
    TempGeneratorArmorComponent],
  imports: [
    CommonModule,
    CommonUiModule,
    AppCpRedTemplateCharacterRoutingModule
  ],
  providers: [
    DiceService,
    CPRedLifePathService,
    CpRedTemplateGeneratorService,
    NameGeneratorService
  ]
})
export class AppCpRedTemplateCharacterModule { }
