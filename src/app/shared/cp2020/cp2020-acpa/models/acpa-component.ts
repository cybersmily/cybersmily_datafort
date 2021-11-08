import { SourceBook } from './../../../models/sourcebook';
export interface ACPAComponent {
  category: string;
  name: string;
  weight: number;
  spaces: number;
  cost: number;
  sp: number;
  sdp: number;
  internal?: string;
  external?: string;
  notes?: string;
  modifiers?: any;
  source: SourceBook;
}
