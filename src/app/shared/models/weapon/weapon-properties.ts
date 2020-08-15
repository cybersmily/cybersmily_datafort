import { WeaponAttribute } from './weapon-attribute';

export class WeaponProperties {
  public static availabilities: Array<WeaponAttribute> = [
    { code: 'E', name: 'Excellent' },
    { code: 'C', name: 'Common' },
    { code: 'P', name: 'Poor' },
    { code: 'R', name: 'Rare' },
  ];
  public static concealments: Array<WeaponAttribute> = [
    { code: 'P', name: 'Pants' },
    { code: 'J', name: 'Jacket' },
    { code: 'L', name: 'Long Coat' },
    { code: 'N', name: 'None' },
  ];
  public static reliabilites: Array<WeaponAttribute> = [
    { code: 'UR', name: 'Unreliable' },
    { code: 'ST', name: 'Standard' },
    { code: 'VR', name: 'Very Reliable' },
  ];
  public static types: Array<WeaponAttribute> = [
    { code: 'P', name: 'Pistol' },
    { code: 'RIF', name: 'Rifle' },
    { code: 'SHT', name: 'Shotgun' },
    { code: 'SMG', name: 'Submachinegun' },
    { code: 'EX', name: 'Exotic' },
    { code: 'MEL', name: 'Melee' },
    { code: 'HVY', name: 'Heavy Weapon' },
  ];
  public static categories: Array<string> = [
    'EXOTICS',
    'HEAVY WEAPONS',
    'MELEE',
    'PISTOLS',
    'RIFLES',
    'SHOTGUNS',
    'SMG',
    'MACHINEGUNS',
    'GRENADES',
    'LAUNCHED GRENADES',
    'GRENADE LAUNCHERS',
    'EXPLOSIVES',
  ];
}
