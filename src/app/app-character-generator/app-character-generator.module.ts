import { LifePathGeneratorService } from './../shared/services/lifepath/life-path-generator.service';
import { EthnicityGeneratorService } from './../shared/services/lifepath/ethnicity-generator.service';
import { FamilyGeneratorService } from './../shared/services/lifepath/family-generator.service';
import { MotivationGeneratorService } from './../shared/services/lifepath/motivation-generator.service';
import { StyleGeneratorService } from './../shared/services/lifepath/style-generator.service';
import { LifeEventsGeneratorService } from '../shared/services/lifepath/life-events-generator.service';
import { DataService } from './../shared/services/data.service';
import { DiceService } from './../shared/services/dice/dice.service';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCharacterGeneratorRoutingModule } from './app-character-generator-routing.module';
import { AppCharacterGeneratorFormComponent } from './app-character-generator-form/app-character-generator-form.component';
import { AppCharacterHandleComponent } from './app-character-handle/app-character-handle.component';
import { AppCharacterRoleComponent } from './app-character-role/app-character-role.component';
import { AppCharacterStatsComponent } from './app-character-stats/app-character-stats.component';
import { AppCharacterArmorComponent } from './app-character-armor/app-character-armor.component';
import { AppCharacterSaveWoundsComponent } from './app-character-save-wounds/app-character-save-wounds.component';
import { AppCharacterImageComponent } from './app-character-image/app-character-image.component';
import { AppCharacterCyberwareComponent } from './app-character-cyberware/app-character-cyberware.component';
import { AppCharacterLifepathComponent } from './app-character-lifepath/app-character-lifepath.component';
import { AppCharacterGearComponent } from './app-character-gear/app-character-gear.component';
import { AppCharacterWeaponsComponent } from './app-character-weapons/app-character-weapons.component';
import { AppCharacterSkillsComponent } from './app-character-skills/app-character-skills.component';
import { AppCharacterSkillComponent } from './app-character-skill/app-character-skill.component';
import { AppCharacterWoundLevelComponent } from './app-character-wound-level/app-character-wound-level.component';

@NgModule({
  declarations: [
    AppCharacterGeneratorFormComponent,
    AppCharacterHandleComponent,
    AppCharacterRoleComponent,
    AppCharacterStatsComponent,
    AppCharacterArmorComponent,
    AppCharacterSaveWoundsComponent,
    AppCharacterImageComponent,
    AppCharacterCyberwareComponent,
    AppCharacterLifepathComponent,
    AppCharacterGearComponent,
    AppCharacterWeaponsComponent,
    AppCharacterSkillsComponent,
    AppCharacterSkillComponent,
    AppCharacterWoundLevelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppCharacterGeneratorRoutingModule,
    FontAwesomeModule,
    ModalModule.forRoot()
  ],
  providers: [
    DiceService,
    DataService,
    StyleGeneratorService,
    MotivationGeneratorService,
    FamilyGeneratorService,
    EthnicityGeneratorService,
    LifeEventsGeneratorService,
    LifePathGeneratorService,
    BsModalRef
  ]
})
export class AppCharacterGeneratorModule { }
