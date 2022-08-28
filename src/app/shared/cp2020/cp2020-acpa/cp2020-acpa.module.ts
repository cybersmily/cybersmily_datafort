import { Cp2020AcpaEquipmentEditorComponent } from './components/cp2020-acpa-equipment-editor/cp2020-acpa-equipment-editor.component';
import { Cp2020ACPABuilderService } from './services/cp2020-acpa-builder/cp2020-acpa-builder.service';
import { PipesModule } from './../../pipes/pipes.module';
import { DiceService } from './../../services/dice/dice.service';
import { DataService } from './../../services/file-services/dataservice/data.service';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { Cp2020ACPADataAttributesService } from './services';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020AcpaFormComponent } from './components/cp2020-acpa-form/cp2020-acpa-form.component';
import { Cp2020AcpaSelectEquipmentComponent } from './components/cp2020-acpa-select-equipment/cp2020-acpa-select-equipment.component';
import { Cp2020AcpaWeaponEditorComponent } from './components/cp2020-acpa-weapon-editor/cp2020-acpa-weapon-editor.component';

@NgModule({
  declarations: [
    Cp2020AcpaFormComponent,
    Cp2020AcpaSelectEquipmentComponent,
    Cp2020AcpaWeaponEditorComponent,
    Cp2020AcpaEquipmentEditorComponent,
  ],
  imports: [CommonModule, CommonUiModule, PipesModule],
  providers: [
    Cp2020ACPADataAttributesService,
    Cp2020ACPABuilderService,
    DataService,
    DiceService,
  ],
  exports: [
    Cp2020AcpaFormComponent,
    Cp2020AcpaSelectEquipmentComponent,
    Cp2020AcpaWeaponEditorComponent,
    Cp2020AcpaEquipmentEditorComponent,
  ],
})
export class Cp2020ACPAModule {}
