import { Cp2020EquipmentUpdateReducer } from './cp2020-equipment-update.reducer';
import { Cp2020EquipmentLoadFailureReducer } from './cp2020-equipment-load-failure.reducer';
import { Cp2020EquipmentLoadSuccessReducer } from './cp2020-equipment-load-success.reducer';
import { Cp2020EquipmentRemoveReducer } from './cp2020-equipment-remove.reducer';
import { Cp2020EquipmentAddReducer } from './cp2020-equipment-add.reducer';

import { createReducer, on } from '@ngrx/store';

import {
  AddCp2020EquipmentAction,
  UpdateCp2020EquipmentAction,
  RemoveCp2020EquipmentAction,
  LoadCp2020EquipmentSuccessAction,
  LoadCp2020EquipmentFailureAction,
} from './../actions/cp2020-equipment.actions';
import { Cp2020Equipment } from '../models/cp2020-equipment';

const initialState: Array<Cp2020Equipment> = new Array<Cp2020Equipment>();

export const Cp2020EquipmentStoreReducer = createReducer(
  initialState,
  on(AddCp2020EquipmentAction, Cp2020EquipmentAddReducer),
  on(UpdateCp2020EquipmentAction, Cp2020EquipmentUpdateReducer),
  on(RemoveCp2020EquipmentAction, Cp2020EquipmentRemoveReducer),
  on(LoadCp2020EquipmentSuccessAction, Cp2020EquipmentLoadSuccessReducer),
  on(LoadCp2020EquipmentFailureAction, Cp2020EquipmentLoadFailureReducer)
);
