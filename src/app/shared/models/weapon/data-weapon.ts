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
    shots?: number;
    bod?: number;
    rof?: number;
    fullAuto?: boolean;
    burstFire?: boolean;
    rel?: string;
    range?: number;
    thrown?: boolean;
    cost?: number;
    notes?: string;
    source?: SourceBook;

    constructor(param?: any) {
        this.name = (param && param.name) ? param.name : '';
        this.type = (param && param.type) ? param.type : '';
        this.category = (param && param.category) ? param.category : '';
        this.subcategory = (param && param.subcategory) ? param.subcategory : '';
        this.wa = (param &&  param.wa ) ? param.wa : 0;
        this.conc = (param && param.conc) ? param.conc : 'N';
        this.avail = (param && param.avail) ? param.avail : '';
        this.damage = (param && param.damage) ? param.damage : '';
        this.ammo = (param && param.ammo) ? param.ammo : '';
        this.ap = (param) ? param.ap : '';
        this.burst = (param) ? param.burst : '';
        this.shots = (param && param.shots) ? param.shots : 0;
        this.bod = (param) ? param.bod : 0;
        this.rof = (param && param.rof) ? param.rof : 0;
        this.fullAuto = (param) ? param.fullAuto : undefined;
        this.burstFire = (param) ? param.burstFire : undefined;
        this.rel = (param && param.rel) ? param.rel.toUpperCase() : 'ST';
        this.range = (param && param.range) ? param.range : 0;
        this.thrown = (param) ? param.thrown : false;
        this.cost = (param && param.cost) ? param.cost : 0;
        this.notes = (param) ? param.notes : undefined;
        this.source = (param) ? param.source : {book: '', page: 0};

    }
}
