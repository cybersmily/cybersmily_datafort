export interface Cp2020Expense {
  housing: Array<any>;
  services: Array<any>;
  food: Array<any>;
  other: Array<any>;
}

export interface Cp2020Housing {
  name: string;
  quality: string;
  desc: string;
  contents: Array<string>;
  location: string;
  qualityMod: number;
  rooms: number;
  count: number;
  cost: number;
}

export interface Cp2020Service {
  name: string;
  unit: string;
  count: number;
  cost: number;
}

export interface Cp2020Food {
  name: string;
  quality: string;
  unit: string;
  qualityMod: number;
  count: number;
  cost: number;
}

export interface Cp2020Sundry {
  name: string;
  unit: string;
  cost: number;
  count: number;
}
