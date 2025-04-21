import { iCrCzActionToken } from "./cr-cz-action-token";
import { iCrCzGearItemCard } from "./cr-cz-gear-item-card";
import { iCrCzLootCard } from "./cr-cz-loot-card";
import { iCrCzNrProgramCard } from "./cr-cz-nr-program-card";

export interface iCrCzUnitCardData {
  name: string;
  eb: number;
  keywords: Array<string>;
  ranks: Array<iCrCzUnitCardRank>;
}

export interface iCrCzUnitCardRank {
  cred: number;
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
  cred: number;
  eb: number;
  armor: number;
  melee: number;
  move: number;
  ranged: number;
  med: number;
  tech: number;
  influence: number;
  keywords: Array<string>;
  specialRules: string;
  unitGear: string;
  actions: Array<string>;
  hacks: number;
  isVulnerable: boolean;
  isDead: boolean;
  actionTokens: Array<iCrCzActionToken>;
  gearCards: Array<iCrCzGearItemCard>;
  programs: Array<iCrCzNrProgramCard>;
  loot: Array<iCrCzLootCard>;

  get totalCost(): number;
  get isLeader(): boolean;
  get isMerc(): boolean;
  get isSpecialist(): boolean;
  get isNetrunner(): boolean;
  get isWheelman(): boolean;
  get isGonk(): boolean;
  get isHacked(): boolean;
  get isRedLined(): boolean;

  get gearList(): string;
  get gearTotalCost(): number;
  get programList(): string;
  get programTotalCost(): number;

}


export class CrCzUnit implements iCrCzUnitCard {
  name: string;
  image: string;
  cred: number;
  eb: number;
  armor: number;
  melee: number;
  move: number;
  ranged: number;
  med: number;
  tech: number;
  influence: number;
  keywords: Array<string>;
  specialRules: string;
  unitGear: string;

  actions: Array<string>;

  hacks: number;
  isVulnerable: boolean;
  isDead: boolean;

  actionTokens: Array<iCrCzActionToken>;
  gearCards: Array<iCrCzGearItemCard>;
  programs: Array<iCrCzNrProgramCard>;
  loot: Array<iCrCzLootCard>;

  get totalCost(): number {
    let total = this.eb;
    total += this.gearTotalCost;
    total += this.programTotalCost;
    return total;
  }

  get isRedLined(): boolean {
    return this.actionTokens.every( action => action.isRed);
  }

  get isHacked(): boolean {
    return this.hacks > 0;
  }

  get isLeader(): boolean {
    return this.keywords.includes('leader');
  }

  get isMerc(): boolean {
    return this.keywords.includes('merc');
  }

  get isGonk(): boolean {
    return this.keywords.includes('gonk');
  }

  get isSpecialist(): boolean {
    return this.keywords.includes('specialist');
  }

  get isNetrunner(): boolean {
    let result = this.keywords.includes('netrunner');
    result = result || (this.gearCards.filter( gear => gear.keywords.includes('Netrunner')).length > 0);
    return result;
  }

  get isWheelman(): boolean {
    return this.keywords.includes('wheelman');
  }

  get gearList(): string {
    if(this.gearCards.length < 1) {
      return '';
    } else {
      return this.gearCards.map(gear => gear.name).join(', ');
    }
  }
  get gearTotalCost(): number {
    return this.gearCards.reduce((a,b) => a + b.eb, 0);
  }

  get programList(): string {
    if(this.programs.length < 1) {
      return '';
    } else {
      return this.programs.map(program => program.name).join(', ');
    }
  }

  get programTotalCost(): number {
    return this.programs.reduce((a,b) => a + b.eb, 0);
  }

}

export const CreateCombatZoneUnitFromObject = (param:any) :iCrCzUnitCard => {
  const unit: CrCzUnit = new CrCzUnit();
  unit.name = param?.name || '';
  unit.image = param?.image || '';
  // backward compatible
  unit.cred = param?.cred || param?.streetCred || param?.streetcred || 0;
  // backward compatible
  unit.eb = param?.eb || param?.ebCost || 0;
  unit.armor = param?.armor || 0;
  unit.melee = param?.melee || 0;
  unit.move = param?.move || 0;
  unit.ranged = param?.ranged || 0;
  unit.med = param?.med || 0;
  unit.tech = param?.tech || 0;
  unit.influence = param?.influence || 0;
  unit.keywords = param?.keywords ? [...param.keywords] : [];
  // backward compatible
  if(param?.faction && !unit.keywords.includes(param.faction)) {
    unit.keywords.unshift(param.faction);
  }
  unit.specialRules = param?.specialRules || '';
  unit.unitGear = param?.unitGear || '';
  unit.actions = param?.actions ? [...param.actions] : [];
  unit.hacks = param?.hacks || 0;
  unit.isVulnerable = param?.isVulnerable || false;
  unit.isDead = param?.isDead || false;
  unit.actionTokens = param?.actionTokens.map(action => ({type: action.type, isUsed: action.isUsed, isRed: action.isRed})) || [];
  unit.gearCards = param?.gearCards ? [...param.gearCards] : [];
  unit.programs = param?.programs ? [...param.programs] : [];
  unit.loot = param?.loot ? [...param.loot] : [];

  return  unit;
};
