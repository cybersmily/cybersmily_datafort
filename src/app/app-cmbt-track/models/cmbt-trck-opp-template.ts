import { OppCyberware } from './../../shared/models/cyberware';
import { CpPlayerWeapon } from './../../shared/models/weapon';
import { CmbtTrckOppTempArmor} from './';
import { Cp2020PlayerSkill } from './../../shared/models/cp2020character';
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
    armor: CmbtTrckOppTempArmor;
    sa: Cp2020PlayerSkill;
    skills: Array<Cp2020PlayerSkill>;
    cyberware: Array<OppCyberware>;
    weapons: Array<CpPlayerWeapon>;
    gear: Array<string>;
}