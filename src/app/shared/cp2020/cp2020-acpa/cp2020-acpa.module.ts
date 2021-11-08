import { Cp2020ACPABuilderService } from './services/cp2020-acpa-builder/cp2020-acpa-builder.service';
import { PipesModule } from './../../pipes/pipes.module';
import { DiceService } from './../../services/dice/dice.service';
import { DataService } from './../../services/file-services/dataservice/data.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { Cp2020ACPADataAttributesService } from './services';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020AcpaFormComponent } from './cp2020-acpa-form/cp2020-acpa-form.component';
import { Cp2020AcpaSourceListComponent } from './cp2020-acpa-source-list/cp2020-acpa-source-list.component';
import { Cp2020AcpaSourceWeaponsComponent } from './cp2020-acpa-source-weapons/cp2020-acpa-source-weapons.component';

@NgModule({
  declarations: [
    Cp2020AcpaFormComponent,
    Cp2020AcpaSourceListComponent,
    Cp2020AcpaSourceWeaponsComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    PipesModule
  ],
  providers: [
    Cp2020ACPADataAttributesService,
    Cp2020ACPABuilderService,
    DataService,
    DiceService
  ],
  exports: [
    Cp2020AcpaFormComponent,
    Cp2020AcpaSourceListComponent,
    Cp2020AcpaSourceWeaponsComponent
  ]
})
export class Cp2020ACPAModule { }
