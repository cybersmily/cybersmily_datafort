import { PipesModule } from './../../pipes/pipes.module';
import { MartialArtsDataService } from './services/martial-arts-data.service';
import { SkillListService } from './services/skill-list.service';
import { Cp2020SkillStatSectionComponent } from './cp2020-skill-stat-section/cp2020-skill-stat-section.component';
import { DiceService } from './../../services/dice/dice.service';
import { DataService } from './../../services/file-services';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020SkillComponent } from './cp2020-skill/cp2020-skill.component';
import { Cp2020SkillListFullComponent } from './cp2020-skill-list-full/cp2020-skill-list-full.component';
import { Cp2020SkillListShortComponent } from './cp2020-skill-list-short/cp2020-skill-list-short.component';
import { Cp2020SkillNewComponent } from './cp2020-skill-new/cp2020-skill-new.component';
import { Cp2020RepSectionComponent } from './cp2020-rep-section/cp2020-rep-section.component';
import { Cp2020SkillEditorComponent } from './cp2020-skill-editor/cp2020-skill-editor.component';



@NgModule({
  declarations: [
    Cp2020SkillComponent,
    Cp2020SkillListFullComponent,
    Cp2020SkillListShortComponent,
    Cp2020SkillNewComponent,
    Cp2020SkillStatSectionComponent,
    Cp2020RepSectionComponent,
    Cp2020SkillEditorComponent
  ],
  exports: [
    Cp2020SkillComponent,
    Cp2020SkillListFullComponent,
    Cp2020SkillListShortComponent,
    Cp2020SkillStatSectionComponent,
    Cp2020RepSectionComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    PipesModule
  ],
  providers: [
    SkillListService,
    MartialArtsDataService,
    DataService,
    DiceService
  ]
})
export class Cp2020SkillsModule { }
