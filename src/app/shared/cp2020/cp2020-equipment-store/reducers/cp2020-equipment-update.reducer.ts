import { Cp2020Equipment } from '../models';

export const Cp2020EquipmentUpdateReducer = (
  state: Array<Cp2020Equipment>,
  props: Cp2020Equipment
): Array<Cp2020Equipment> => {
  const newState = [...state];
  const index = newState.findIndex(
    (equip) =>
      equip.name.toLowerCase() === props.name.toLowerCase() &&
      equip.category.toLowerCase() === props.category.toLowerCase()
  );
  if (index > -1) {
    newState[index] = { ...props };
  }
  return newState.sort(
    (a, b) =>
      a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
  );
};
