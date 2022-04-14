import { Cp2020Equipment } from '../models/cp2020-equipment';

export const Cp2020EquipmentLoadFailureReducer = (
  state: Array<Cp2020Equipment>,
  props: { error: any }
): Array<Cp2020Equipment> => {
  return new Array<Cp2020Equipment>();
};
