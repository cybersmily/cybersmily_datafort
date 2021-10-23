import { SourceBook } from './../../../models/sourcebook';
import { ArmorLocations } from './armor-locations';
import { ArmorPiece } from './armor-piece';
import { PieceOfClothing } from './piece-of-clothing';
import { ArmorOption } from './armor-option';

export class Cp2020ArmorPiece implements ArmorPiece {
  name: string;
  clothes: PieceOfClothing;
  type: ArmorOption; // how heavy is the item
  style: ArmorOption; // the style of it, like EdgeRunner or High Fashion
  quality: ArmorOption; // the quality of the clothes, Very Good, Superchic, Average etc.
  options: ArmorOption[];
  baseSP: number;
  locations: ArmorLocations;
  ev: number;
  order: number;
  isHard: boolean;
  isActive: boolean;
  isSkinWeave: boolean;
  isLeather: boolean;
  cost: number;
  source?:SourceBook;

  constructor(param?: any) {
    this.name = param?.name ?? '';
    this.clothes = {
      name: param?.clothes?.name ?? '',
      cost: param?.clothes?.cost ?? 0,
      wt: param?.clothes?.wt ?? '',
      loc: param?.clothes?.loc ?? ''
    };
    this.style = {
      name: param?.style?.name ?? '',
      mod:  param?.style?.mod ?? 1
    };
    this.quality = {
      name: param?.style?.name ?? '',
      mod:  param?.style?.mod ?? 1
    };
    this.options = param?.optoins?.map(opt => opt) ?? new Array<ArmorOption>();

    this.baseSP = param?.baseSP ?? 0;
    this.locations = param?.locations ?? {};

    this.ev = param?.ev ?? 0;
    this.order = param?.order ?? 0;
    this.isHard = param?.isHard ?? false;
    this.isActive = param?.isActive ?? false;
    this.isSkinWeave = param?.isSkinWeave ?? false;
    this.isLeather = param?.isLeather ?? false;

    this.cost = param?.cost ?? 0;

    // set legacy armor values
    if(param?.head) {
      this.locations.head = 0;
      this.baseSP = (param.head > this.baseSP) ? param.head : this.baseSP;
    }
    if(param?.torso) {
      this.locations.torso = 0;
      this.baseSP = (param.torso > this.baseSP) ? param.torso : this.baseSP;
    }
    if(param?.rarm) {
      this.locations.rarm = 0;
      this.baseSP = (param.rarm > this.baseSP) ? param.rarm : this.baseSP;
    }
    if(param?.larm) {
      this.locations.larm = 0;
      this.baseSP = (param.larm > this.baseSP) ? param.larm : this.baseSP;
    }
    if(param?.rleg) {
      this.locations.rleg = 0;
      this.baseSP = (param.rleg > this.baseSP) ? param.rleg : this.baseSP;
    }
    if(param?.lleg) {
      this.locations.lleg = 0;
      this.baseSP = (param.lleg > this.baseSP) ? param.lleg : this.baseSP;
    }

    // set the locations to the baseSP
    for(const key in this.locations) {
      this.locations[key] = this.baseSP;
    }
    if(param?.source) {
      this.source = {book: param.source.book, page: param.source.page};
    }
  }
}
