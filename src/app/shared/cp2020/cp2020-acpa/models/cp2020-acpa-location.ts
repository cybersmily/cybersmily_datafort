import { ACPALocation } from './acpa-location';
export class Cp2020ACPALocation implements ACPALocation{
  name: string;
  sp: number;
  sdp: number;
  internalSpaces: number;
  externalSpaces: number;

  constructor(param?: ACPALocation) {
    this.name = param?.name ?? '';
    this.sp = param?.sp ?? 0;
    this.sdp = param?.sdp ?? 0;
    this.internalSpaces = param?.internalSpaces ?? 0;
    this.externalSpaces = param?.externalSpaces ?? 0;
  }
}
