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



@NgModule({
  declarations: [
    Cp2020EquipmentEditorComponent,
    Cp2020EquipmentListComponent
  ],
  exports: [
    Cp2020EquipmentEditorComponent,
    Cp2020EquipmentListComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    PipesModule,
    StoreModule.forFeature('cp2020EquipmentStore', Cp2020EquipmentStoreReducer),
    EffectsModule.forFeature([Cp2020EquipmentLoadEffect])
  ],
  providers: [
    DataService
  ]
})
export class Cp2020EquipmentStoreModule { }
