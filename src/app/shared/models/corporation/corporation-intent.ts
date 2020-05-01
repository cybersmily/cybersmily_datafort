import { CorporationProduct } from './corporation-product';

export interface CorporationIntent {
  goal: string;
  longterm: string;
  products: CorporationProduct[];
  allies: string[];
  enemies: string[];
}
