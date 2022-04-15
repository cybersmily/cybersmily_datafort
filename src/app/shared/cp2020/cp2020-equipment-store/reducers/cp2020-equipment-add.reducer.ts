import { Cp2020Equipment } from '../models/cp2020-equipment';
import { v4 as uuidv4 } from 'uuid';

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
  if (!props.id) {
    props.id = uuidv4();
  }
  return [...state, props].sort(
    (a, b) =>
      a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
  );
};
