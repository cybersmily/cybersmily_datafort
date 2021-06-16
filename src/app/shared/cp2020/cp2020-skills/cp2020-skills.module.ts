import { DiceService } from './../../services/dice/dice.service';
import { DataService } from './../../services/file-services/data.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020SkillComponent } from './cp2020-skill/cp2020-skill.component';
import { Cp2020SkillListFullComponent } from './cp2020-skill-list-full/cp2020-skill-list-full.component';
import { Cp2020SkillListShortComponent } from './cp2020-skill-list-short/cp2020-skill-list-short.component';



@NgModule({
  declarations: [
    Cp2020SkillComponent,
    Cp2020SkillListFullComponent,
    Cp2020SkillListShortComponent],
  imports: [
    CommonModule,
    CommonUiModule,
  ],
  providers: [
    DataService,
    DiceService
  ]
})
export class Cp2020SkillsModule { }
