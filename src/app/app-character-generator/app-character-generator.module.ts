import { Cp2020GearModule } from './../shared/cp2020/cp2020-gear/cp2020-gear.module';
import { Cp2020ContactsModule } from './../shared/cp2020/cp2020-contacts/cp2020-contacts.module';
import { ImageHolderModule } from './../shared/modules/image-holder/image-holder.module';
import { Cp2020NetrunGearModule } from '../shared/cp2020/cp2020-netrun-gear/cp2020-netrun-gear.module';
import { Cp2020LifepathModule } from './../shared/cp2020/cp2020-lifepath/cp2020-lifepath.module';
import { Cp2020VehiclesModule } from './../shared/cp2020/cp2020-vehicles/cp2020-vehicles.module';
import { Cp2020RoleModule } from './../shared/cp2020/cp2020-role/cp2020-role.module';
import { Cp2020SkillsModule } from './../shared/cp2020/cp2020-skills/cp2020-skills.module';
import { Cp2020LifestyleModule } from './../shared/cp2020/cp2020-lifestyle/cp2020-lifestyle.module';
import { Cp2020ArmorModule } from './../shared/cp2020/cp2020-armor/cp2020-armor.module';
import { Cp2020WoundsModule } from './../shared/cp2020/cp2020wounds/cp2020wounds.module';
import { Cp2020StatsModule } from './../shared/cp2020/cp2020-stats/cp2020-stats.module';
import { NameGeneratorService } from './../shared/services/namegen/name-generator.service';
import { Cp2020CyberwareModule } from './../shared/cp2020/cp2020-cyberware/cp2020-cyberware.module';
import { Cp2020weaponsModule } from './../shared/cp2020/cp2020weapons/cp2020weapons.module';
import { CommonUiModule } from './../shared/modules/common-ui/common-ui.module';
import { LifePathGeneratorService } from './../shared/cp2020/cp2020-lifepath/services';
import { EthnicityGeneratorService } from './../shared/cp2020/cp2020-lifepath/services';
import { FamilyGeneratorService } from './../shared/cp2020/cp2020-lifepath/services';
import { MotivationGeneratorService } from './../shared/cp2020/cp2020-lifepath/services';
import { StyleGeneratorService } from './../shared/cp2020/cp2020-lifepath/services';
import { LifeEventsGeneratorService } from '../shared/cp2020/cp2020-lifepath/services';
import { DataService } from './../shared/services/file-services';
import { DiceService } from './../shared/services/dice/dice.service';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCharacterGeneratorRoutingModule } from './app-character-generator-routing.module';
import { AppCharacterGeneratorFormComponent } from './app-character-generator-form/app-character-generator-form.component';
import { AppCharacterHandleComponent } from './app-character-handle/app-character-handle.component';
import { AppCharacterImageComponent } from './app-character-image/app-character-image.component';
import { AppCharacterInstructionComponent } from './app-character-instruction/app-character-instruction.component';
import { AppCharacterSettingsComponent } from './app-character-settings/app-character-settings.component';

@NgModule({
  declarations: [
    AppCharacterGeneratorFormComponent,
    AppCharacterHandleComponent,
    AppCharacterImageComponent,
    AppCharacterInstructionComponent,
    AppCharacterSettingsComponent,
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    AppCharacterGeneratorRoutingModule,
    Cp2020weaponsModule,
    Cp2020CyberwareModule,
    Cp2020StatsModule,
    Cp2020WoundsModule,
    Cp2020ArmorModule,
    Cp2020LifestyleModule,
    Cp2020SkillsModule,
    Cp2020RoleModule,
    Cp2020VehiclesModule,
    Cp2020LifepathModule,
    Cp2020NetrunGearModule,
    Cp2020ContactsModule,
    Cp2020GearModule,
    ImageHolderModule,
    ModalModule.forRoot(),
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
    BsModalRef,
  ],
})
export class AppCharacterGeneratorModule {}
