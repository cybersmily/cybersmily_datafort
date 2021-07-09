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

    /**
   * Calculates the total cost of the piece of clothing.
   * Each modifier is multiplied together and then
   * multiplied the PieceOfClothing base cost.
   * @memberof FashionInputComponent
   */
  calculateTotal() {
    const price: number = Number(this.clothes.cost);
    let mod = 1;
    if (this.isLeather) {
      const leather: number = Number(this.clothes.leather);
      mod = isNaN(leather) ? mod : (mod * leather);
    }
    if (this.options.length > 0) {
      // process which optionsn are chosen and add them up
      this.options.forEach(
        opt => {
          if (isNaN(opt.mod)) {
            const optMod = opt.mod[this.clothes.wt];
            if (!isNaN(optMod)) {
              mod = mod * optMod;
            }
          } else {
            mod = mod * Number(opt.mod);
          }
        }
      );
    }
    const style: number = Number(this.style.mod);
    if (!isNaN(style) && style > 0) {
      mod = mod * style;
    }
    const quality: number = Number(this.quality.mod);
    if (!isNaN(quality) && quality > 0) {
      mod = mod * quality;
    }
    const sp: number = Number(this.spRating.mod);
    if (!isNaN(sp) && sp > 0) {
      mod = mod * sp;
    }

    this.totalCost = Math.ceil(mod * price);
  }


}




