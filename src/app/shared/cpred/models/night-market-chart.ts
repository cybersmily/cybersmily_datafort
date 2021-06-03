export interface NightMarketChart {
  charts: Array<NightMarketCategory>;
}

export interface NightMarketCategory {
  name: string;
  chart: Array<NightMarketEntry>;
}

export interface NightMarketEntry {
  name: string;
  weight: number;
  price?: number;
}

export interface NightMarketListing {
  category: string;
  items: Array<string>;
}
