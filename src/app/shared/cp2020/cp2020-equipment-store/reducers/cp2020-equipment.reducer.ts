
import { createReducer, on } from '@ngrx/store';

import {
  AddCp2020EquipmentAction,
  RemoveCp2020EquipmentAction,
  LoadCp2020EquipmentSuccessAction,
  LoadCp2020EquipmentFailureAction,
} from './../actions/cp2020-equipment.actions';
import { Cp2020Equipment } from '../models/cp2020-equipment';

const initialState: Array<Cp2020Equipment> = new Array<Cp2020Equipment>();

export const Cp2020EquipmentStoreReducer = createReducer(
  initialState,
  on(
    AddCp2020EquipmentAction,
    (
      state: Array<Cp2020Equipment>,
      props: Cp2020Equipment
    ): Array<Cp2020Equipment> => {
      // only save if the type and name are unique within the array.
      if (
        state.some(
          (item) =>
            item.name.toLowerCase() === props.name?.toLowerCase() &&
            item.category.toLowerCase() === props.category?.toLowerCase()
        )
      ) {
        return state;
      }
      return [...state, props];
    }
  ),
  on(
    RemoveCp2020EquipmentAction,
    (
      state: Array<Cp2020Equipment>,
      props: Cp2020Equipment
    ): Array<Cp2020Equipment> => {
      const newState = [...state];
      const index: number = newState.findIndex(
        (item) =>
          item.name.toLowerCase() === props.name?.toLowerCase() &&
          item.category.toLowerCase() === props.category?.toLowerCase()
      );
      if (index > -1) {
        newState.splice(index, 1);
      }
      return newState;
    }
  ),
  on(
    LoadCp2020EquipmentSuccessAction,
    (
      state: Array<Cp2020Equipment>,
      props: { props: Array<Cp2020Equipment> }
    ): Array<Cp2020Equipment> => {
      const newState = [...props.props];
      return newState;
    }
  ),
  on(
    LoadCp2020EquipmentFailureAction,
    (
      state: Array<Cp2020Equipment>,
      props: { error: any }
    ): Array<Cp2020Equipment> => {
      return new Array<Cp2020Equipment>();
    }
  )
);
