import { iCrCzGearItemCard } from '../models/cr-cz-gear-item-card';

export function CreateCombatZoneGear(param?: any): iCrCzGearItemCard {
  const gear: iCrCzGearItemCard = {
    name: param?.name || '',
    faction: param?.faction || '',
    cred: param?.cred || 0,
    eb: param?.eb || 0,
    rarity: param?.rarity || 0,
    action: param?.action || '',
    ranges: param?.ranges || '',
    damage: param?.damage || false,
    armor: param?.armor || 0,
    keywords: (param?.keywords) ? [...param?.keywords] : [],
    attributes: (param?.attributes) ? [...param?.attributes] : [],
    flipped: param?.flipped || false,
    release: (param?.release) ? [...param?.release] : [],
  };
  return gear;
}
