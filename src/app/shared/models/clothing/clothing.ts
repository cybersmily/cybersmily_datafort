import { ClothingArmor } from './clothing-armor';
import { ClothingOption } from './clothing-option';
import { PieceOfClothing } from './piece-of-clothing';

export class Clothing {
    clothes: PieceOfClothing;
    type: ClothingOption; // how heavy is the item
    style: ClothingOption; // the style of it, like EdgeRunner or High Fashion
    quality: ClothingOption; // the quality of the clothes, Very Good, Superchic, Average etc.
    spRating: ClothingArmor; // stopping power of the item.
    ev: number; // encumberance value of the item
    totalCost: number; // total cost of the clothing
    options: ClothingOption[];
    isLeather?: boolean;

    constructor() {
      this.clothes = {name: '', cost: 0, wt: '', loc: ''};
      this.type = {name: '', mod: ''};
      this.style = {name: '', mod: ''};
      this.quality = {name: '', mod: ''};
      this.spRating = {name: '', mod: '', sp: 0, ev: 0};
      this.ev = 0;
      this.totalCost = 0;
      this.isLeather = false;
      this.options = new Array();
    }
}




