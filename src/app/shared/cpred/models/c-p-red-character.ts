
export interface cpRedStatMod {
  name: string;
  value: number;
}

export interface cpRedStat {
  base: number;
  modified: number;
  modifiers: Array<cpRedStatMod>;
}

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
  notes; string;
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

export interface cpRedCharacter {
  handle: string;
  aliases: string;
  notes: string;

  role: cpRedRole;

  stats: {
    int: cpRedStat;
    ref: cpRedStat;
    dex: cpRedStat;
    tech: cpRedStat;
    cool: cpRedStat;
    will: cpRedStat;
    luck: cpRedStat;
    move: cpRedStat;
    body: cpRedStat;
    emp: cpRedStat;
  };

  humanity: number;
  wounds: number;
  deathsave: number;
  criticalInjuries: string;
  addictions: string;

  skills: Array<cpRedSkill>;

  ip: number;
  curIP: number;
  rep: number;
  repEvents: string;

  weapons: Array<cpRedWeapon>;
  gear: Array<cpRedGear>;
  cash: number;
  creadit: number;

  fashion: string;
  housing: string;
  rent: string;
  lifestyle: string;
  lifePath: cpRedLifePath;

  cyberware: cpRedCharacterCyberware;
}

export class CPRedCharacterSheet {
  private _character: cpRedCharacter;

  constructor(character?: cpRedCharacter) {
    if(character) {
      this._character = character;
    } else {
      this._character = {
        handle: '',
        aliases: '',
        notes: '',
        role: undefined,
        stats: {
          int: undefined,
          ref: undefined,
          dex: undefined,
          tech: undefined,
          cool: undefined,
          will: undefined,
          luck: undefined,
          move: undefined,
          body: undefined,
          emp: undefined
        },

        humanity: 0,
        wounds: 0,
        deathsave: 0,
        criticalInjuries: '',
        addictions: '',

        skills: new Array<cpRedSkill>(),

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

        cyberware: undefined

      };
    }

  }
}
