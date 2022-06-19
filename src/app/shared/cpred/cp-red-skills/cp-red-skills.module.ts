import { CpRedSkillManagerService } from './services/cp-red-skill-manager/cp-red-skill-manager.service';
import { CpRedSkillDataService } from './services/cp-red-skill-data/cp-red-skill-data.service';
import { PipesModule } from './../../pipes/pipes.module';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpRedSkillComponent } from './componet/cp-red-skill/cp-red-skill.component';
import { CpRedSkillEditorComponent } from './componet/cp-red-skill-editor/cp-red-skill-editor.component';
import { CpRedSkillsEditorComponent } from './componet/cp-red-skills-editor/cp-red-skills-editor.component';
import { CpRedSkillsComponent } from './componet/cp-red-skills/cp-red-skills.component';

@NgModule({
  declarations: [
    CpRedSkillComponent,
    CpRedSkillEditorComponent,
    CpRedSkillsEditorComponent,
    CpRedSkillsComponent,
  ],
  exports: [
    CpRedSkillComponent,
    CpRedSkillEditorComponent,
    CpRedSkillsEditorComponent,
    CpRedSkillsComponent,
  ],
  imports: [CommonModule, CommonUiModule, PipesModule],
  providers: [CpRedSkillDataService, CpRedSkillManagerService],
})
export class CpRedSkillsModule {}