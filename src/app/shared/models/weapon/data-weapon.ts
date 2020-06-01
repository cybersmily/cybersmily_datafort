import { SourceBook } from './../sourcebook';
import { CpWeapon } from './cp-weapon';

export class DataWeapon implements CpWeapon {
    id?: number;
    name: string;
    type: string;
    category?: string;
    subcategory?: string;
    wa: string | number;
    conc?: string;
    avail?: string;
    ammo?: string;
    ap?:string;
    damage?: string;
    burst?: string | number;
    shots?: string | number;
    bod?: number;
    rof?: string | number;
    fullAuto?: boolean;
    burstFire?: boolean;
    rel?: string;
    range?: number| string;
    thrown?: boolean;
    cost?: string | number;
    notes?: string;
    source?: SourceBook;

    constructor(param?: any) {
        this.name = (param) ? param.name : '';
        this.type = (param) ? param.type : '';
        this.category = (param) ? param.category : undefined;
        this.subcategory = (param) ? param.subcategory : undefined;
        this.wa = (param) ? param.wa : 0;
        this.conc = (param) ? param.conc : undefined;
        this.avail = (param) ? param.avail : undefined;
        this.ammo = (param) ? param.ammo : undefined;
        this.ap = (param) ? param.ap : undefined;
        this.damage = (param) ? param.damage : '';
        this.burst = (param) ? param.burst : undefined;
        this.shots = (param) ? param.shots : undefined;
        this.bod = (param) ? param.bod : undefined;
        this.rof = (param) ? param.rof : undefined;
        this.fullAuto = (param) ? param.fullAuto : undefined;
        this.burstFire = (param) ? param.burstFire : undefined;
        this.rel = (param) ? param.rel : undefined;
        this.range = (param) ? param.range : undefined;
        this.thrown = (param) ? param.thrown : undefined;
        this.cost = (param) ? param.cost : undefined;
        this.notes = (param) ? param.notes : undefined;
        this.source = (param) ? param.source : {book: '', page: 0};

    }
}
