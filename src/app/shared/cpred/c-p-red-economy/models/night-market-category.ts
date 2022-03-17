import { NightMarketEntry } from './night-market-entry';

export interface NightMarketCategory {
  name: string;
  chart: Array<NightMarketEntry>;
}
