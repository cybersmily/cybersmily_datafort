import { SourceBook } from './../sourcebook';

export interface CorporationData {
  name: string;
  industry: string;
  hq: string;
  cp2020: boolean;
  cpred: boolean;
  source: SourceBook;
}
