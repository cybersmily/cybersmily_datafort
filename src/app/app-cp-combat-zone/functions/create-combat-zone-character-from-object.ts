import { CrCzCharacter, iCrCzCharacterCard } from "../models/cr-cz-character-card";
import { CreateCombatZoneGear } from "./create-combat-zone-gear";
import { CreateCombatZoneProgram } from "./create-combat-zone-program";

export const CreateCombatZoneCharacterFromObject = (param:any) :iCrCzCharacterCard => {
  const unit: CrCzCharacter = new CrCzCharacter();
  unit.name = param?.name || '';
  unit.image = param?.image || '';
  // backward compatible
  unit.cred = param?.cred || param?.streetCred || param?.streetcred || 0;
  // backward compatible
  unit.eb = param?.eb || param?.ebCost || 0;
  unit.armor = param?.armor || 0;
  unit.melee = param?.melee || 0;
  unit.reflex = param?.move || param?.reflex || 0;
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
  unit.gearCards = param?.gearCards.map(gear => CreateCombatZoneGear(gear)) || [];
  unit.programs = param?.programs.map(program => CreateCombatZoneProgram(program)) || [];
  unit.loot = param?.loot ? [...param.loot] : [];
  unit.notes = param?.notes || '';
  unit.luck = param?.luck || 0;
  unit.releases = (param?.release) ? [...param.release] : [];

  return  unit;
};
