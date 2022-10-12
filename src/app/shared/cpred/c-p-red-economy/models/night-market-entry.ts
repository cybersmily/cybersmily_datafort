export interface NightMarketEntry {
  name: string;
  weight?: number;
  price?: number;
  required?: NightMarketEntry;
}
