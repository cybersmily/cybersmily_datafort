import { DiceService } from './../../../services/dice/dice.service';
import { faDice } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cp2020ArmorPiece, PieceOfClothing } from './../models';

@Component({
  selector: 'cs-cp2020-armor-detail',
  templateUrl: './cp2020-armor-detail.component.html',
  styleUrls: ['./cp2020-armor-detail.component.css']
})
export class Cp2020ArmorDetailComponent implements OnInit {
  faDice = faDice;

  currArmor: Cp2020ArmorPiece = new Cp2020ArmorPiece();

  // piece of clothes
  @Input()
  armor = new Cp2020ArmorPiece();

  @Output()
  change = new EventEmitter<Cp2020ArmorPiece>();

  constructor(private dice: DiceService) { }

  ngOnInit() {
    this.currArmor = new Cp2020ArmorPiece(this.armor);
  }

  /**
   * changeClothing executes when the clothing changes. This will
   * filter the SP Rating selection dropdown.
   * @param {*} event event that is passsed to this function from the UI.
   * @memberof FashionInputComponent
   */
  changeClothing(event: PieceOfClothing) {
    this.currArmor = new Cp2020ArmorPiece();
    this.currArmor.clothes = event;
    // this.setSPRatingList();
    this.calculateTotal();
  }




  /**
   * Calculates the total cost of the piece of clothing.
   * Each modifier is multiplied together and then
   * multiplied the PieceOfClothing base cost.
   * @memberof FashionInputComponent
   */
  calculateTotal() {
    // TODO: this.currClothing.calculateTotal();
  }

  /**
   * selectStyle will set the current clothing's style.
   * @param {any} event - clothing option that was selected
   *                      from child component.
   * @memberof FashionInputComponent
   */
  selectStyle(event) {
    this.currArmor.style = event;
    this.calculateTotal();
  }

  /**
   * selectQuality sets the current clothing's quality.
   * @param {any} event - clothing option that was selected
   *                      from child component.
   * @memberof FashionInputComponent
   */
  selectQuality(event) {
    this.currArmor.quality = event;
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
    //this.currClothing.spRating = event;
    this.currArmor.ev = (event.ev) ? event.ev : 0;
    this.calculateTotal();
  }

  /**
   * selectOptions sets the current clothing options.
   * @param {any} event - clothing options that were selected
   *                      from child component.
   * @memberof FashionInputComponent
   */
  selectOptions(event) {
    this.currArmor.options = event;
    this.calculateTotal();
  }

  /**
  * selectLeather sets the current clothing leather option.
  * @param {any} event - clothing option that was selected
  *                      from child component.
  * @memberof FashionInputComponent
  */
  selectLeather(event) {
    this.currArmor.isLeather = event;
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
      //this.purchaseClothing.emit(JSON.parse(JSON.stringify(this.currArmor)));
    }
  }

  /**
   * isPurchaseable is a validator for determining if the currClothing can be purchased.
   * @returns {boolean} - returns true if the clothing is a piece of clothing, a quality,
   *                      and style have been selected.
   * @memberof FashionInputComponent
   */
  get isPurchaseable(): boolean {
    if (this.currArmor.clothes.name && this.currArmor.clothes.name !== ''
      && this.currArmor.quality.name && this.currArmor.style.name) {
      return true;
    }
    return false;
  }
}
