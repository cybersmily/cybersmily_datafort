export interface ACPAChassis {
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
}

export interface ACPABodyLocations {
  head: number;
  torso: number;
  arms: number;
  legs: number;
}
