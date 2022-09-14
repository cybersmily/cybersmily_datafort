import { CpRedSkillDiceRollComponent } from './components/cp-red-skill-dice-roll/cp-red-skill-dice-roll.component';
import { CpRedSkillManagerService } from './services/cp-red-skill-manager/cp-red-skill-manager.service';
import { CpRedSkillDataService } from './services/cp-red-skill-data/cp-red-skill-data.service';
import { PipesModule } from './../../pipes/pipes.module';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedSkillComponent } from './components/cp-red-skill/cp-red-skill.component';
import { CpRedSkillEditorComponent } from './components/cp-red-skill-editor/cp-red-skill-editor.component';
import { CpRedSkillsEditorComponent } from './components/cp-red-skills-editor/cp-red-skills-editor.component';
import { CpRedSkillsComponent } from './components/cp-red-skills/cp-red-skills.component';
import { CpRedSkillsByPropertyComponent } from './components/cp-red-skills-by-property/cp-red-skills-by-property.component';

@NgModule({
  declarations: [
    CpRedSkillComponent,
    CpRedSkillEditorComponent,
    CpRedSkillsEditorComponent,
    CpRedSkillsComponent,
    CpRedSkillDiceRollComponent,
    CpRedSkillsByPropertyComponent,
  ],
  exports: [
    CpRedSkillComponent,
    CpRedSkillEditorComponent,
    CpRedSkillsEditorComponent,
    CpRedSkillsComponent,
    CpRedSkillDiceRollComponent,
    CpRedSkillsByPropertyComponent,
  ],
  imports: [CommonModule, CommonUiModule, PipesModule],
})
export class CpRedSkillsModule {}
