import { ArmorSettingsChoices } from './../enums/armor-settings-choices';
export interface ArmorRandomSettings {
  armor: ArmorSettingsChoices;
  isLeather: boolean;
  style: string;
  quality: string;
  hasOptions: boolean;
  maxCost: number;
  locations?: string;
  isLayerCalculationEnabled?: boolean;
}

export class CP2020ArmorRandomSettings implements ArmorRandomSettings {
  armor: ArmorSettingsChoices = ArmorSettingsChoices.both;
  isLeather: boolean = false;
  style: string = '';
  quality: string = '';
  hasOptions: boolean = true;
  maxCost: number = 1000000;
  locations?: string;
  isLayerCalculationEnabled?: boolean = true;
}
