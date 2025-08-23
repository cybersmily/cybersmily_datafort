import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCpCombatZoneRoutingModule } from './app-cp-combat-zone-routing.module';
import { CommonUiModule } from '../shared/modules/common-ui/common-ui.module';
import { DataService } from '../shared/services/file-services';
import { CrCzMainFormComponent } from './cr-cz-main-form/cr-cz-main-form.component';
import { CrCzCharacterFormComponent } from "./cr-cz-character-form/cr-cz-character-form.component";
import { CrCzCharacterListComponent } from "./cr-cz-character-list/cr-cz-character-list.component";
import { CrCzProgramListComponent } from './cr-cz-program-list/cr-cz-program-list.component';
import { CrCzGearListComponent } from "./cr-cz-gear-list/cr-cz-gear-list.component";
import { PipesModule } from '../shared/pipes/pipes.module';
import { CrCzArmyListComponent } from './cr-cz-army-list/cr-cz-army-list.component';
import { CrCzFactionSelectorComponent } from './cr-cz-faction-selector/cr-cz-faction-selector.component';
import { CrCzSquadFormComponent } from './cr-cz-squad-form/cr-cz-squad-form.component';
import { CrCzObjectiveListComponent } from './cr-cz-objective-list/cr-cz-objective-list.component';
import { CrCzGearCardComponent } from './cr-cz-gear-card/cr-cz-gear-card.component';
import { CrCzProgramCardComponent } from './cr-cz-program-card/cr-cz-program-card.component';
import { CrCzSourceSelectorComponent } from './cr-cz-source-selector/cr-cz-source-selector.component';


@NgModule({
  declarations: [
    CrCzMainFormComponent,
    CrCzCharacterListComponent,
    CrCzCharacterFormComponent,
    CrCzProgramListComponent,
    CrCzGearListComponent,
    CrCzArmyListComponent,
    CrCzFactionSelectorComponent,
    CrCzSquadFormComponent,
    CrCzObjectiveListComponent,
    CrCzGearCardComponent,
    CrCzProgramCardComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    AppCpCombatZoneRoutingModule,
    PipesModule,
    CrCzSourceSelectorComponent
],
  providers: [
    DataService
  ]

})
export class AppCpCombatZoneModule { }
