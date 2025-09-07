import { iCrCzNrProgramCard } from './../models/cr-cz-nr-program-card';

export function CreateCombatZoneProgram(param?): iCrCzNrProgramCard {

  const program: iCrCzNrProgramCard = {
    name: param?.name || '',
    factions: param?.factions || '',
    action: param?.action || '',
    inspiredRefresh: param?.inspiredRefresh || false,
    vulnerable: param?.vulnerable || true,
    cred: param?.cred || 0,
    eb: param?.eb || 0,
    rarity: param?.rarity || 0,
    release: (param?.release) ? [...param.release] : [],
    isRunning: false,
    range: (param?.range) || '',

    flavor: param?.flavor || '',
    load: param?.load || '',
    effect: param?.effect || '',
    refresh: param?.refresh || ''

  };
  return program;
}
