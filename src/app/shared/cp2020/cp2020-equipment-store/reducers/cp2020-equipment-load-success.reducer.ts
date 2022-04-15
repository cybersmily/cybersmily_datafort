import { Cp2020Equipment } from '../models/cp2020-equipment';

export const Cp2020EquipmentLoadSuccessReducer = (
  state: Array<Cp2020Equipment>,
  props: { props: Array<Cp2020Equipment> }
): Array<Cp2020Equipment> => {
  const newState = [...props.props];
  return newState.sort(
    (a, b) =>
      a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
  );
};
