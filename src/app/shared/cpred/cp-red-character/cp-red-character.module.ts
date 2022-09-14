import { CpRedCharacterPdfService } from './services/cp-red-character-pdf/cp-red-character-pdf.service';
import { CPRedLifepathModule } from './../c-p-red-lifepath/c-p-red-lifepath.module';
import { CpRedCyberwareModule } from './../cp-red-cyberware/cp-red-cyberware.module';
import { CpRedGearModule } from './../cp-red-gear/cp-red-gear.module';
import { CpRedWeaponsModule } from './../cp-red-weapons/cp-red-weapons.module';
import { CpRedArmorModule } from './../cp-red-armor/cp-red-armor.module';
import { cpRedArmor } from './../models/cp-red-character-sheet';
import { CpRedWoundsModule } from './../cp-red-wounds/cp-red-wounds.module';
import { CpRedRolesModule } from './../cp-red-roles/cp-red-roles.module';
import { CPRedStatsModule } from './../c-p-red-stats/c-p-red-stats.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ImageHolderModule } from './../../modules/image-holder/image-holder.module';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { CpRedCharacterFormComponent } from './components/cp-red-character-form/cp-red-character-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedCharacterSettingsFormComponent } from './components/cp-red-character-settings-form/cp-red-character-settings-form.component';
import { CpRedSkillsModule } from '../cp-red-skills/cp-red-skills.module';
import { CpRedCharacterNotesComponent } from './components/cp-red-character-notes/cp-red-character-notes.component';

@NgModule({
  declarations: [
    CpRedCharacterFormComponent,
    CpRedCharacterSettingsFormComponent,
    CpRedCharacterNotesComponent,
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    ImageHolderModule,
    PipesModule,
    CPRedStatsModule,
    CpRedSkillsModule,
    CpRedRolesModule,
    CpRedWoundsModule,
    CpRedArmorModule,
    CpRedWeaponsModule,
    CpRedGearModule,
    CpRedCyberwareModule,
    CPRedLifepathModule,
  ],
  exports: [CpRedCharacterFormComponent],
})
export class CpRedCharacterModule {}
