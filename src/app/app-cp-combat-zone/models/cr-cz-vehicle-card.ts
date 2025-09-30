import { KeyValue } from "@angular/common";

export interface CrCzVehicleCard {
  name: string;
  keywords: Array<string>;
  eb: number;
  armor: number;
  hullTokens: Array<string>;
  seats: Array<KeyValue<string,Array<string>>>;
  modSlots: Array<string>;
  specialRules?: Array<KeyValue<string, string>>;
}
