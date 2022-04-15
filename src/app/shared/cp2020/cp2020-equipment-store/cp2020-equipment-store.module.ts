import { Cp2020EquipmentDataService } from './services/cp2020-equipment-data.service';
import { Cp2020EquipmentLoadEffect } from './effects/cp2020-equipment-load.effect';
import { EffectsModule } from '@ngrx/effects';
import { DataService } from './../../services/file-services/dataservice/data.service';
import { PipesModule } from './../../pipes/pipes.module';
import { Cp2020EquipmentStoreReducer } from './reducers/cp2020-equipment.reducer';
import { StoreModule } from '@ngrx/store';
import { CommonUiModule } from './../../modules/common-ui/common-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cp2020EquipmentEditorComponent } from './components/cp2020-equipment-editor/cp2020-equipment-editor.component';
import { Cp2020EquipmentListComponent } from './components/cp2020-equipment-list/cp2020-equipment-list.component';
import { Cp2020EquipmentItemComponent } from './components/cp2020-equipment-item/cp2020-equipment-item.component';

@NgModule({
  declarations: [
    Cp2020EquipmentEditorComponent,
    Cp2020EquipmentListComponent,
    Cp2020EquipmentItemComponent,
  ],
  exports: [
    Cp2020EquipmentEditorComponent,
    Cp2020EquipmentListComponent,
    Cp2020EquipmentItemComponent,
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    PipesModule,
    StoreModule.forFeature('cp2020EquipmentStore', Cp2020EquipmentStoreReducer),
    EffectsModule.forFeature([Cp2020EquipmentLoadEffect]),
  ],
  providers: [DataService, Cp2020EquipmentDataService],
})
export class Cp2020EquipmentStoreModule {}