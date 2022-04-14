import { Cp2020Equipment } from '../models/cp2020-equipment';

export const Cp2020EquipmentAddReducer = (
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
};
