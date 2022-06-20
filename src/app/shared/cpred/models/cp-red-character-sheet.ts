import { CpRedCharacterSkill } from './../cp-red-skills/models/cp-red-character-skill';
import { CpRedCharacterStats } from './../c-p-red-stats/models/';
export interface cpRedRoleAbility {
  name: string;
  rank: number;
  desc: string;
}

export interface cpRedRole {
  name: string;
  ability: cpRedRoleAbility;
}

export interface cpRedSkill {
  name: string;
  catgegory: string;
  level: number;
  stat: string;
  statVale: number;
  base: number;
  ipMod: number;
}

export interface cpRedArmor {
  name: string;
  location: string;
  sp: number;
  currentSP: number;
  penalty: number;
  worn: boolean;
  cost: number;
}

export interface cpRedWeapon {
  name: string;
  type: string;
  dmg: string;
  ammo: number;
  rof: number;
  curAmmo: number;
  notes: string;
  cost: number;
}

export interface cpRedGear {
  name: string;
  notes: string;
  cost: number;
}

export interface cpRedCyberware {
  name: string;
  notes;
  string;
  hc: string;
  humanityLoss: number;
  cost: number;
}

export interface cpRedCharacterCyberware {
  cyberaudio: Array<cpRedCyberware>;
  rightCybereye: Array<cpRedCyberware>;
  leftCybereye: Array<cpRedCyberware>;
  rightCyberarm: Array<cpRedCyberware>;
  leftCyberarm: Array<cpRedCyberware>;
  rightCyberleg: Array<cpRedCyberware>;
  leftCyberleg: Array<cpRedCyberware>;
  neuralLink: Array<cpRedCyberware>;
  internalCyberware: Array<cpRedCyberware>;
  externalCyberware: Array<cpRedCyberware>;
  fashionware: Array<cpRedCyberware>;
  borgware: Array<cpRedCyberware>;
}

export interface cpRedEnemy {
  who: string;
  what: string;
  resources: string;
  whatHappens: string;
}

export interface cpRedLifePath {
  culturalOrigin: string;
  clothing: string;
  personality: string;
  hairstyle: string;
  feelAboutPeople: string;
  valueMost: string;
  valuedPerson: string;
  valuedPossession: string;
  familyBackground: string;
  familyCrisis: string;
  childhoodEnvironment: string;
  lifeGoals: string;
  friends: Array<string>;
  loveAffairs: Array<string>;
  enemies: Array<cpRedEnemy>;
  roleSpecific: string;
}

import { CpRedCharacter } from './cp-red-character';

export class CPRedCharacterSheet {
  character: CpRedCharacter;

  constructor(character?: CpRedCharacter) {
    if (character) {
      this.character = character;
    } else {
      this.character = {
        handle: '',
        aliases: '',
        notes: '',
        image: '',
        role: undefined,
        stats: new CpRedCharacterStats(),

        humanity: 0,
        wounds: 0,
        deathsave: 0,
        criticalInjuries: '',
        addictions: '',

        skills: new Array<CpRedCharacterSkill>(),
        /*
        ip: 0,
        curIP: 0,
        rep: 0,
        repEvents: '',

        weapons: new Array<cpRedWeapon>(),
        gear: new Array<cpRedGear>(),
        cash: 0,
        creadit: 0,

        fashion: '',
        housing: '',
        rent: '',
        lifestyle: '',
        lifePath: undefined,

        cyberware: undefined,
        */
      };
    }
  }
}
