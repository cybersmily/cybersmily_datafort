/**
 * MAX METAL pg 15-16
 *
 * @export
 * @interface MaxMetalWeaponMount
 */
export interface MaxMetalWeaponMount {
  name: string;
  description: string;
  availability: string;
  cost: string | number;
  wa: string;
  spaces: number;
  spacelimit: string;
  typelimit?: string;
}
