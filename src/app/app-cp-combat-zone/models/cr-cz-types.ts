
export type crCzObjectiveRewardType =
  | 'cybergear'
  | 'ongoing'
  | 'recycles'
  | 'misc';
export type crCzActionColor = 'g' | 'y' | 'r' | 'p' | 'b' | '';
export type crCzActionType =
  | 'move'
  | 'melee'
  | 'ranged'
  | 'med'
  | 'tech'
  | 'influence'
  | '';
export type crCzRanges =
  | 'any'
  | 'nored'
  | 'greenlong'
  | 'long'
  | 'green'
  | 'yellow'
  | 'red'
  | 'yellowgreen'
  | 'redyellow'
  | '';

export const CRCZ_LOCAL_STORAGE_KEY: string = 'cs-cr-cz-army-data';

export const CRCZ_FACTIONS: Array<string> = [
  '',
  '6th street',
  'arasaka',
  'bozo',
  'danger gal',
  'edgerunner',
  'generation red',
  'lawman',
  'maelstrom',
  'piranha',
  'trauma team',
  'tyger claw',
  'wild thing',
  'zoner',
  'universal',
];
