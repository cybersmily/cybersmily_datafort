import { Cp2020Equipment } from '../models/cp2020-equipment';

export const Cp2020EquipmentRemoveReducer = (
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
};
