import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCpCombatZoneRoutingModule } from './app-cp-combat-zone-routing.module';
import { CommonUiModule } from '../shared/modules/common-ui/common-ui.module';
import { DataService } from '../shared/services/file-services';
import { CrCzMainFormComponent } from './cr-cz-main-form/cr-cz-main-form.component';
import { CrCzUnitFormComponent } from "./cr-cz-unit-form/cr-cz-unit-form.component";
import { CrCzUnitListComponent } from "./cr-cz-unit-list/cr-cz-unit-list.component";
import { CrCzProgramListComponent } from './cr-cz-program-list/cr-cz-program-list.component';
import { CrCzGearListComponent } from "./cr-cz-gear-list/cr-cz-gear-list.component";
import { PipesModule } from '../shared/pipes/pipes.module';
import { CrCzArmyListComponent } from './cr-cz-army-list/cr-cz-army-list.component';
import { CrCzFactionSelectorComponent } from './cr-cz-faction-selector/cr-cz-faction-selector.component';
import { CrCzSquadFormComponent } from './cr-cz-squad-form/cr-cz-squad-form.component';
import { CrCzObjectiveListComponent } from './cr-cz-objective-list/cr-cz-objective-list.component';
import { CrCzGearCardComponent } from './cr-cz-gear-card/cr-cz-gear-card.component';


@NgModule({
  declarations: [
    CrCzMainFormComponent,
    CrCzUnitListComponent,
    CrCzUnitFormComponent,
    CrCzProgramListComponent,
    CrCzGearListComponent,
    CrCzArmyListComponent,
    CrCzFactionSelectorComponent,
    CrCzSquadFormComponent,
    CrCzObjectiveListComponent,
    CrCzGearCardComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    AppCpCombatZoneRoutingModule,
    PipesModule
],
  providers: [
    DataService
  ]

})
export class AppCpCombatZoneModule { }
