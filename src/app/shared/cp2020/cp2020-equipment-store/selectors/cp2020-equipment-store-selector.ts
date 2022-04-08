import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Cp2020Equipment } from '../models';

export const cp2020EquipmentStoreSelector = createFeatureSelector<
  Array<Cp2020Equipment>
>('cp2020EquipmentStore');

export const cp2020EquipmentCategoriesSelector = createSelector(
  cp2020EquipmentStoreSelector,
  (gearList: Array<Cp2020Equipment>) => [
    ...new Set(gearList.map((gear) => gear.category)),
  ]
);
