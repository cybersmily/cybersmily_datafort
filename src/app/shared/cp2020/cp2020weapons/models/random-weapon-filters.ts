export interface RandomWeaponSettings {
  count: number;
  filters: RandomWeaponFilters;
}
export interface RandomWeaponFilters {
  type?: Array<string>;
  category?: Array<string>;
  subcategory?: Array<string>;
  cost?: number;
  ammo?: Array<string>;
  conc?: Array<string>;
  availability?: Array<string>;
}
