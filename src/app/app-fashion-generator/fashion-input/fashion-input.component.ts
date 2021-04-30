import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Clothing, PieceOfClothing, ClothingOption, ClothingArmor } from '../../shared/models/clothing';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-fashion-input',
  templateUrl: './fashion-input.component.html',
  styleUrls: ['./fashion-input.component.css']
})
export class FashionInputComponent implements OnInit {
  faPlus = faPlus;

  currClothing: Clothing;
  spRatingsList: ClothingArmor[];

  // piece of clothes
  @Input()
  clothes: PieceOfClothing[];

  // style of clothes
  @Input()
  styleList: ClothingOption[];

  // quality of clothes
  @Input()
  qualityList: ClothingOption[];

  // SP of clothes
  @Input()
  armoringList: ClothingArmor[];

  // options of clothes
  @Input()
  optionsList: ClothingOption[];

  @Output()
  purchaseClothing: EventEmitter<Clothing> = new EventEmitter<Clothing>();

  constructor() { }

  ngOnInit() {
    this.currClothing = new Clothing();
    this.spRatingsList = new Array();
  }

  /**
   * changeClothing executes when the clothing changes. This will
   * filter the SP Rating selection dropdown.
   * @param {*} event event that is passsed to this function from the UI.
   * @memberof FashionInputComponent
   */
  changeClothing(event: PieceOfClothing) {
    this.currClothing = new Clothing();
    this.currClothing.clothes = event;
    if (this.currClothing.clothes.wt && this.currClothing.clothes.wt !== '') {
      const wt = this.currClothing.clothes.wt;
      this.spRatingsList = new Array();
      this.spRatingsList.push({ name: '', mod: 1, ev: 0, sp: 0 });
      this.armoringList.forEach((spRating, index) => {
        if (spRating.mod && spRating.mod.hasOwnProperty(wt)) {
          const rating: ClothingArmor = { name: '', mod: 0, ev: 0, sp: 0 };
          rating.mod = spRating.mod ? spRating.mod[wt] : 0;
          rating.name = spRating.name;
          rating.ev = spRating.ev ? spRating.ev[wt] : 0;
          rating.sp = spRating.sp;
          this.spRatingsList.push(rating);
        }
      });
    } else {
      this.spRatingsList = this.armoringList;
    }
    this.calculateTotal();
  }

  /**
   * Calculates the total cost of the piece of clothing.
   * Each modifier is multiplied together and then
   * multiplied the PieceOfClothing base cost.
   * @memberof FashionInputComponent
   */
  calculateTotal() {
    const price: number = Number(this.currClothing.clothes.cost);
    let mod = 1;
    if (this.currClothing.isLeather) {
      const leather: number = Number(this.currClothing.clothes.leather);
      mod = isNaN(leather) ? mod : (mod * leather);
    }
    if (this.currClothing.options.length > 0) {
      // process which optionsn are chosen and add them up
      this.currClothing.options.forEach(
        opt => {
          if (isNaN(opt.mod)) {
            const optMod = opt.mod[this.currClothing.clothes.wt];
            if (!isNaN(optMod)) {
              mod = mod * optMod;
            }
          } else {
            mod = mod * Number(opt.mod);
          }
        }
      );
    }
    const style: number = Number(this.currClothing.style.mod);
    if (!isNaN(style) && style > 0) {
      mod = mod * style;
    }
    const quality: number = Number(this.currClothing.quality.mod);
    if (!isNaN(quality) && quality > 0) {
      mod = mod * quality;
    }
    const sp: number = Number(this.currClothing.spRating.mod);
    if (!isNaN(sp) && sp > 0) {
      mod = mod * sp;
    }

    this.currClothing.totalCost = mod * price;
  }

  /**
   * selectStyle will set the current clothing's style.
   * @param {any} event - clothing option that was selected
   *                      from child component.
   * @memberof FashionInputComponent
   */
  selectStyle(event) {
    this.currClothing.style = event;
    this.calculateTotal();
  }

  /**
   * selectQuality sets the current clothing's quality.
   * @param {any} event - clothing option that was selected
   *                      from child component.
   * @memberof FashionInputComponent
   */
  selectQuality(event) {
    this.currClothing.quality = event;
    this.calculateTotal();
  }

  /**
   * selectSPRating sets the current Clothing's SP Rating
   * for armoring the piece of clothing.
   * @param {any} event - clothing armor option that was selected
   *                      from child component.
   * @memberof FashionInputComponent
   */
  selectSPRating(event) {
    this.currClothing.spRating = event;
    this.currClothing.ev = (event.ev) ? event.ev : 0;
    this.calculateTotal();
  }

  /**
   * selectOptions sets the current clothing options.
   * @param {any} event - clothing options that were selected
   *                      from child component.
   * @memberof FashionInputComponent
   */
  selectOptions(event) {
    this.currClothing.options = event;
    this.calculateTotal();
  }

  /**
  * selectLeather sets the current clothing leather option.
  * @param {any} event - clothing option that was selected
  *                      from child component.
  * @memberof FashionInputComponent
  */
  selectLeather(event) {
    this.currClothing.isLeather = event;
    this.calculateTotal();
  }

  /**
   * purchase will emit an event that passes the currClothing object up to the parent
   * @param {any} event - element event if needed.
   * @memberof FashionInputComponent
   */
  purchase(event) {
    // to create a deep object of clothing, needed to do some
    // JSON manipulation to achieve a true copy of the the object
    if (this.isPurchaseable) {
      this.purchaseClothing.emit(JSON.parse(JSON.stringify(this.currClothing)));
    }
  }

  /**
   * isPurchaseable is a validator for determining if the currClothing can be purchased.
   * @returns {boolean} - returns true if the clothing is a piece of clothing, a quality,
   *                      and style have been selected.
   * @memberof FashionInputComponent
   */
  get isPurchaseable(): boolean {
    if (this.currClothing.clothes.name && this.currClothing.clothes.name !== ''
      && this.currClothing.quality.name && this.currClothing.style.name) {
      return true;
    }
    return false;
  }
}
