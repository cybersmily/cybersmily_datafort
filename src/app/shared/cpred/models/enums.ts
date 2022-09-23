export enum CP_RED_PENATLY_TYPE {
  SKILL = 'skill',
  STAT = 'stat',
  ALL_ACTIONS = 'all actions',
  DEATH_SAVE = 'death save',
  OTHER = 'other',
}

export enum CP_RED_GENERATE_SYSTEMS {
  JUMPKIT = 'jump start kit',
  STREETRATS = 'streetrats',
  EDGERUNNERS = 'edgerunners',
  COMPLETE_PACKAGE = 'complete package',
  ROLL_EACH_STAT = 'roll 1d10 for each stat, min 2',
  ROLL_STAT_POOL = 'roll 10d10, reroll 1s, allot points to stats',
}

export enum CP_RED_STAT_COMPLETE_PACKAGE {
  MINOR_SUPPORT = 50,
  STARTING = 62,
  MAJOR_SUPPORT = 70,
  MINOR_HERO = 75,
  MAJOR_HERO = 80,
}
