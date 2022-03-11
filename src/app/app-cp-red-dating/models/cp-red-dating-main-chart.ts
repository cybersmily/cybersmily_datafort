import { CpRedDatingOutcome } from './cp-red-dating-outcome';
import { CpRedDatingType } from './cp-red-dating-type';
import { NameChart } from '../../shared/models/name-chart';
import { KeyValue } from '@angular/common';
export interface CpRedDatingMainChart {
  keywords: Array<string>;
  locations: Array<KeyValue<string, string>>;
  activity: Array<NameChart>;
  datetypes: {
    charts: Array<string>;
    types: Array<CpRedDatingType>;
  },
  postdate: { chart: Array<CpRedDatingOutcome> };
  variables: Array<NameChart>;
}
