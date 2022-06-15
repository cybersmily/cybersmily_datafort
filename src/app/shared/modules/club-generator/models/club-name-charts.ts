import { ValueWeight } from './../../../models';

export interface ClubNameCharts {
  venue: Array<ValueWeight<string>>;
  adjectives: Array<ValueWeight<string>>;
  names: Array<ValueWeight<string>>;
}
