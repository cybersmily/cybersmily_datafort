import { OppCyberware } from './../../cp2020/cp2020-cyberware/models/opp-cyberware';
import { ArmorBlock } from '../../cp2020/cp2020-armor/models/armor-block';
import { CpPlayerWeapon } from './../../cp2020/cp2020weapons/models';
import { Cp2020PlayerSkill } from './../../cp2020/cp2020-skills/models';
export interface CmbtTrckOppTemplate {
    handle: string;
    role: string;
    int: number;
    ref: number;
    body:  number;
    luck:  number;
    tech:  number;
    cool:  number;
    attr:  number;
    ma: number;
    emp:  number;
    armor: ArmorBlock;
    sa: Array<Cp2020PlayerSkill>;
    skills: Array<Cp2020PlayerSkill>;
    cyberware: Array<OppCyberware>;
    weapons: Array<CpPlayerWeapon>;
    selectedWeapon?:CpPlayerWeapon;
    gear: Array<string>;
}
