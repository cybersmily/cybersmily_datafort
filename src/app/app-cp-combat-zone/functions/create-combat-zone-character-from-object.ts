import { CrCzCharacter, iCrCzCharacterCard } from "../models/cr-cz-character-card";
import { CreateCombatZoneGear } from "./create-combat-zone-gear";
import { CreateCombatZoneProgram } from "./create-combat-zone-program";

export const CreateCombatZoneCharacterFromObject = (input: any): iCrCzCharacterCard => {
  const unit: CrCzCharacter = new CrCzCharacter();
  const {
    name = '',
    image = '',
    cred,
    streetCred,
    streetcred,
    eb,
    ebCost,
    armor = 0,
    melee = 0,
    move,
    reflex,
    ranged = 0,
    med = 0,
    tech = 0,
    influence = 0,
    keywords = [],
    faction,
    specialRules = '',
    unitGear = '',
    actions = [],
    hacks = 0,
    isVulnerable = false,
    isDead = false,
    actionTokens = [],
    gearCards = [],
    programs = [],
    loot = [],
    notes = '',
    luck = 0,
    release = []
  } = input ?? {};

  unit.name = name;
  unit.image = image;
  // backward compatible
  unit.cred = cred || streetCred || streetcred || 0;
  // backward compatible
  unit.eb = eb || ebCost || 0;
  unit.armor = armor;
  unit.melee = melee;
  unit.reflex = move || reflex || 0;
  unit.ranged = ranged;
  unit.med = med;
  unit.tech = tech;
  unit.influence = influence;

  unit.keywords = Array.isArray(keywords) ? [...keywords] : [];

  // backward compatible
  if (faction && !unit.keywords.includes(faction)) {
    unit.keywords.unshift(faction);
  }

  unit.specialRules = specialRules;
  unit.unitGear = unitGear;
  unit.actions = Array.isArray(actions) ? [...actions] : [];
  unit.hacks = hacks;
  unit.isVulnerable = isVulnerable;
  unit.isDead = isDead;
  unit.actionTokens = Array.isArray(actionTokens)
    ? actionTokens.map((action) => ({
        type: action?.type,
        isUsed: action?.isUsed,
        isRed: action?.isRed
      }))
    : [];
  unit.gearCards = Array.isArray(gearCards)
    ? gearCards.map((gear) => CreateCombatZoneGear(gear))
    : [];
  unit.programs = Array.isArray(programs)
    ? programs.map((program) => CreateCombatZoneProgram(program))
    : [];
  unit.loot = Array.isArray(loot) ? [...loot] : [];
  unit.notes = notes;
  unit.luck = luck;
  unit.releases = Array.isArray(release) ? [...release] : [];

  return unit;
};
