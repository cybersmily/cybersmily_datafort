import { Cp2020EquipmentActionTypes } from '../types/cp2020-equipment-action-types';
import { Cp2020Equipment } from '../models';
import { createAction, props } from '@ngrx/store';

export const AddCp2020EquipmentAction = createAction(
  Cp2020EquipmentActionTypes.ADD_EQUIPMENT,
  props<Cp2020Equipment>()
);

export const RemoveCp2020EquipmentAction = createAction(
  Cp2020EquipmentActionTypes.REMOVE_EQUIPMENT,
  props<Cp2020Equipment>()
);

export const LoadCp2020EquipmentAction = createAction(
  Cp2020EquipmentActionTypes.LOAD_DATA,
  props<{request: string}>()
);

export const LoadCp2020EquipmentSuccessAction = createAction(
  Cp2020EquipmentActionTypes.LOAD_DATA_SUCCESS,
  props<{props:Array<Cp2020Equipment>}>()
);

export const LoadCp2020EquipmentFailureAction = createAction(
  Cp2020EquipmentActionTypes.LOAD_DATA_FAILURE,
  props<{error: any}>()
  );
