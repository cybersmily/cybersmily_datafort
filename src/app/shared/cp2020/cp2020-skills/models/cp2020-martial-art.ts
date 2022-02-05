import { SourceBook } from '../../../models/sourcebook';
export interface Cp2020MartialArt {
  name: string;
  source: SourceBook;
  ipMod: number;
  strike: number;
  punch: number;
  kick: number;
  disarm: number;
  sweep: number;
  block: number;
  dodge: number;
  grapple: number;
  throw: number;
  hold: number;
  choke: number;
  escape: number;
  ram: number;
}
