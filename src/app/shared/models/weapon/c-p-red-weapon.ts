export interface CPRedWeapon {
  name: string;
  type: string;
  skill: string;
  damage: string;
  quality: string;
  concealability: boolean;
  hands: number;
  rof: number;
  cost: number;
  magazine: number;
  attachments: Array<string>;
}
