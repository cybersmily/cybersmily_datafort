import { ArmorBlock } from '../armor/armor-block';
import { OppCyberware } from '../cyberware';
import { CpPlayerWeapon } from '../weapon';
import { Cp2020PlayerSkill } from '../cp2020character';
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
    sa: Cp2020PlayerSkill;
    skills: Array<Cp2020PlayerSkill>;
    cyberware: Array<OppCyberware>;
    weapons: Array<CpPlayerWeapon>;
    gear: Array<string>;
}
