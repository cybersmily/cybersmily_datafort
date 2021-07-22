import { CpRedLifepathCoreRoleChartEntry } from './cp-red-lifepath-core-role-chart-entry';
import { CpRedLifepathCultureChartEntry } from "./cp-red-lifepath-culture-chart-entry";

export interface CpRedLifepathCoreData {
  culture: Array<CpRedLifepathCultureChartEntry>;
  personality: Array<string>;
  clothing: Array<string>;
  hairstyle: Array<string>;
  affectation: Array<string>;
  valueMost: Array<string>;
  feelAboutPeople: Array<string>;
  valuedPerson: Array<string>;
  valuedPossesion: Array<string>;
  originalBackground: Array<string>;
  childhoodEnvironment: Array<string>;
  familyCrisis: Array<string>;
  goals: Array<string>;
  friends: Array<string>;
  enemies: Array<string>;
  enemyReason:Array<string>;
  enemyResources: Array<string>;
  enemyReaction: Array<string>;
  romance: Array<string>;
  roles: Array<CpRedLifepathCoreRoleChartEntry>;
}

