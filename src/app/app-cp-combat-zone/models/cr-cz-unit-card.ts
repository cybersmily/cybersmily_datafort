import { iCrCzActionToken } from "./cr-cz-action-token";
import { iCrCzGearItemCard } from "./cr-cz-gear-item-card";
import { iCrCzLootCard } from "./cr-cz-loot-card";
import { iCrCzNrProgramCard } from "./cr-cz-nr-program-card";
import { crCzFaction} from "./cr-cz-types";

export interface iCrCzUnitCardData {
  name: string;
  faction: crCzFaction;
  ebCost: number;
  isLeader: boolean;
  isMerc: boolean;
  isGonk: boolean;
  keywords: Array<string>;

  ranks: Array<iCrCzUnitCardRank>;

}

export interface iCrCzUnitCardRank {
  streetcred: number;
  armor: number;
  melee: number;
  move: number;
  ranged: number;
  med: number;
  tech: number;
  influence: number;
  actions: Array<string>;
  specialRules: string;
  unitGear: string;
}

export interface iCrCzUnitCard {
  name: string;
  image: string;
  faction: crCzFaction;
  streetcred: number;
  ebCost: number;
  armor: number;
  melee: number;
  move: number;
  ranged: number;
  med: number;
  tech: number;
  influence: number;
  isLeader: boolean;
  isMerc: boolean;
  isGonk: boolean;
  keywords: Array<string>;
  specialRules: string;
  unitGear: string;
  actions: Array<string>;

  totalCost: number;

  isHacked: boolean;
  isVulnerable: boolean;
  isDead: boolean;
  actionTokens: Array<iCrCzActionToken>;
  gearCards: Array<iCrCzGearItemCard>;
  programs: Array<iCrCzNrProgramCard>;
  loot: Array<iCrCzLootCard>;
}


export class CrCzUnit implements iCrCzUnitCard {
  name: string;
  image: string;
  faction: crCzFaction;
  streetcred: number;
  ebCost: number;
  armor: number;
  melee: number;
  move: number;
  ranged: number;
  med: number;
  tech: number;
  influence: number;
  isLeader: boolean;
  isMerc: boolean;
  isGonk: boolean;
  keywords: Array<string>;
  specialRules: string;
  unitGear: string;

  actions: Array<string>;

  isHacked: boolean;
  isVulnerable: boolean;
  isDead: boolean;

  actionTokens: Array<iCrCzActionToken>;
  gearCards: Array<iCrCzGearItemCard>;
  programs: Array<iCrCzNrProgramCard>;
  loot: Array<iCrCzLootCard>;

  get totalCost(): number {
    const total = this.ebCost + this.gearCards.reduce((a,b) => a + b.eb,0);
    return total;
  }

  get isRedLined(): boolean {
    return this.actionTokens.every( action => action.isRed);
  }

  constructor(param?: iCrCzUnitCard) {
    this.name = param?.name || '';
    this.image = param?.image || '';
    this.faction = param?.faction || '';
    this.streetcred = param?.streetcred || 0;
    this.ebCost = param?.ebCost || 0;
    this.armor = param?.armor || 0;
    this.melee = param?.melee || 0;
    this.move = param?.move || 0;
    this.ranged = param?.ranged || 0;
    this.med = param?.med || 0;
    this.tech = param?.tech || 0;
    this.influence = param?.influence || 0;
    this.isLeader = param?.isLeader || false;
    this.isMerc = param?.isMerc || false;
    this.isGonk = param?.isGonk || false;
    this.keywords = param?.keywords ? [...param.keywords] : [];
    this.specialRules = param?.specialRules || '';
    this.unitGear = param?.unitGear || '';

    this.isHacked = param?.isHacked || false;
    this.isVulnerable = param?.isVulnerable || false;
    this.isDead = param?.isDead || false;

    this.actions = param?.actions ? [...param.actions] : [];
    this.actionTokens = param?.actionTokens ? [...param?.actionTokens] : [];
    this.gearCards = param?.gearCards ? param.gearCards.map(gear => gear) : [];
    this.programs = param?.programs ? param.programs.map(program => program) : [];
    this.loot = param?.loot ? param.loot.map(loot => loot) : [];

  }

}
