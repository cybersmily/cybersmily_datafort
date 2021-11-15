import { ACPAChassis, ACPABodyLocations } from './acpa-chassis';

export class Cp2020ACPAChassis implements ACPAChassis {
  name: string;
  manufacturer: string;
  str:number;
  toughness:number;
  damageMod:string;
  lift:number;
  carry:number;
  weight:number;
  cost: number;
  spaces: ACPABodyLocations;
  sdp: ACPABodyLocations;

  constructor(param?: ACPAChassis) {
    this.name = param?.name ?? '';
    this.manufacturer = param?.manufacturer ?? '';
    this.str = param?.str ?? 0;
    this.toughness = param?.toughness ?? 0;
    this.damageMod = param?.damageMod ?? '';
    this.lift = param?.lift ?? 0;
    this.carry = param?.carry ?? 0;
    this.weight = param?.weight ?? 0;
    this.cost = param?.cost ?? 0;
    this.spaces = {
      head: param?.spaces?.head ?? 0,
      torso: param?.spaces?.torso ??0,
      arms: param?.spaces?.arms ??0,
      legs: param?.spaces?.legs ??0};
    this.sdp = {
      head: param?.sdp?.head ?? 0,
      torso: param?.sdp?.torso ??0,
      arms: param?.sdp?.arms ??0,
      legs: param?.sdp?.legs ??0};
  }
}
