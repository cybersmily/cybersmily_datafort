import { ArmorWeights } from './armor-weights';
export interface ArmorOption {
  name: string;
  type?: string;
  mod: number | ArmorWeights;
  desc?: string;
  effect?: string;
}
