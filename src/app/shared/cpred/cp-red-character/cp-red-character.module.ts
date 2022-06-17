import { CPRedStatsModule } from './../c-p-red-stats/c-p-red-stats.module';
import { PipesModule } from './../../pipes/pipes.module';
import { ImageHolderModule } from './../../modules/image-holder/image-holder.module';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { CpRedCharacterFormComponent } from './components/cp-red-character-form/cp-red-character-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedCharacterSettingsFormComponent } from './components/cp-red-character-settings-form/cp-red-character-settings-form.component';
import { CpRedSkillsModule } from '../cp-red-skills/cp-red-skills.module';

@NgModule({
  declarations: [
    CpRedCharacterFormComponent,
    CpRedCharacterSettingsFormComponent,
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    ImageHolderModule,
    PipesModule,
    CPRedStatsModule,
    CpRedSkillsModule,
  ],
  exports: [CpRedCharacterFormComponent],
})
export class CpRedCharacterModule {}
