import { NameGeneratorService } from './../shared/services/namegen/name-generator.service';
import { RedJumpkitLifepathService } from './../shared/services/lifepath/red-jumpkit-lifepath.service';
import { CpRedTemplateGeneratorService } from './../shared/services/cpredpc/cp-red-template-generator.service';
import { DiceService } from './../shared/services/dice/dice.service';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
    AppCpRedTemplateCharacterRoutingModule
  ],
  providers: [
    DiceService,
    RedJumpkitLifepathService,
    CpRedTemplateGeneratorService,
    NameGeneratorService
  ]
})
export class AppCpRedTemplateCharacterModule { }
