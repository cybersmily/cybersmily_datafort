import { ArmorSettingsChoices } from './../enums/armor-settings-choices';
export interface ArmorRandomSettings {
  armor: ArmorSettingsChoices;
  isLeather: boolean;
  style: string;
  quality: string;
  hasOptions: boolean;
  maxCost: number;
}

export class CP2020ArmorRandomSettings implements ArmorRandomSettings {
  isArmor: boolean = false;
  armor: ArmorSettingsChoices;
  isLeather: boolean = false;
  style: string = '';
  quality: string = '';
  hasOptions: boolean = true;
  maxCost: number = 1000000;
}
