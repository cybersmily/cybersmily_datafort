export interface CpDrug {
  name: string;
  description: string;
  effects: Array<CpDrugEffect>;
  sideEffects: Array<CpDrugEffect>;
  strength: number;
  duration: string;
  cost: number;
}

export interface CpDrugEffect {
  diff: number;
  effect: string;
  desc?: string;
}

export interface CpSelectedDrugEffect {
  diff: number;
  effect: string;
  desc?: string;
  enabled?: boolean;
}
