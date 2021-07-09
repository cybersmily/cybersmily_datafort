export interface ClothingRandomSettings {
  isArmor: boolean;
  isLeather: boolean;
  style: string;
  quality: string;
  hasOptions: boolean;
  maxCost: number;
}

export class CP2020ClothingRandomSettings implements ClothingRandomSettings {
  isArmor: boolean = false;
  isLeather: boolean = false;
  style: string = '';
  quality: string = '';
  hasOptions: boolean = true;
  maxCost: number = 1000000;
}
