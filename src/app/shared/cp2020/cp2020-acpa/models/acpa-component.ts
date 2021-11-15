import { SourceBook } from './../../../models/sourcebook';
export interface ACPAComponent {
  category: string;
  name: string;
  weight: number;
  spaces: number;
  cost: number;
  weightMod?: {component:string, mod:number}
  costMod?: {component:string, mod:number}
  sp: number;
  sdp: number;
  internal?: string;
  external?: string;
  notes?: string;
  modifiers?: any;
  source: SourceBook;
}
