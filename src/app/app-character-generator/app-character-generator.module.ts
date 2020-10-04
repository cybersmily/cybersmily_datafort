import { Cp2020WoundsModule } from './../shared/cp2020/cp2020wounds/cp2020wounds.module';
import { Cp2020StatsModule } from './../shared/cp2020/cp2020-stats/cp2020-stats.module';
import { NameGeneratorService } from './../shared/services/namegen/name-generator.service';
import { Cp2020CyberwareModule } from './../shared/cp2020/cp2020-cyberware/cp2020-cyberware.module';
import { Cp2020weaponsModule } from './../shared/cp2020/cp2020weapons/cp2020weapons.module';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { LifePathGeneratorService } from './../shared/services/lifepath/life-path-generator.service';
import { EthnicityGeneratorService } from './../shared/services/lifepath/ethnicity-generator.service';
import { FamilyGeneratorService } from './../shared/services/lifepath/family-generator.service';
import { MotivationGeneratorService } from './../shared/services/lifepath/motivation-generator.service';
import { StyleGeneratorService } from './../shared/services/lifepath/style-generator.service';
import { LifeEventsGeneratorService } from '../shared/services/lifepath/life-events-generator.service';
import { DataService } from './../shared/services/data.service';
import { DiceService } from './../shared/services/dice/dice.service';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCharacterGeneratorRoutingModule } from './app-character-generator-routing.module';
import { AppCharacterGeneratorFormComponent } from './app-character-generator-form/app-character-generator-form.component';
import { AppCharacterHandleComponent } from './app-character-handle/app-character-handle.component';
import { AppCharacterRoleComponent } from './app-character-role/app-character-role.component';
import { AppCharacterArmorComponent } from './app-character-armor/app-character-armor.component';
import { AppCharacterImageComponent } from './app-character-image/app-character-image.component';
import { AppCharacterCyberwareComponent } from './app-character-cyberware/app-character-cyberware.component';
import { AppCharacterLifepathComponent } from './app-character-lifepath/app-character-lifepath.component';
import { AppCharacterGearComponent } from './app-character-gear/app-character-gear.component';
import { AppCharacterSkillsComponent } from './app-character-skills/app-character-skills.component';
import { AppCharacterSkillComponent } from './app-character-skill/app-character-skill.component';

@NgModule({
  declarations: [
    AppCharacterGeneratorFormComponent,
    AppCharacterHandleComponent,
    AppCharacterRoleComponent,
    AppCharacterArmorComponent,
    AppCharacterImageComponent,
    AppCharacterCyberwareComponent,
    AppCharacterLifepathComponent,
    AppCharacterGearComponent,
    AppCharacterSkillsComponent,
    AppCharacterSkillComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    AppCharacterGeneratorRoutingModule,
    Cp2020weaponsModule,
    Cp2020CyberwareModule,
    Cp2020StatsModule,
    Cp2020WoundsModule,
    ModalModule.forRoot()
  ],
  providers: [
    DiceService,
    DataService,
    NameGeneratorService,
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
