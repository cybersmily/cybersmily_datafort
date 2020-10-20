import { CmbtZoneEvent } from './cmbt-zone-event';
export interface CmbtZoneEventData {
  daytime: Array<CmbtZoneEvent>;
  evening: Array<CmbtZoneEvent>;
  aftermidnight: Array<CmbtZoneEvent>;
}
