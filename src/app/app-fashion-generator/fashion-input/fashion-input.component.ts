import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DiceService } from './../../shared/services/dice/dice.service';
import { faPlus, faDice, faCog } from '@fortawesome/free-solid-svg-icons';
import { Clothing, PieceOfClothing, ClothingOption, ClothingArmor } from '../../shared/models/clothing';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CP2020ClothingRandomSettings } from './../../shared/models/clothing/clothing-random-settings';

@Component({
  selector: 'cs-fashion-input',
  templateUrl: './fashion-input.component.html',
  styleUrls: ['./fashion-input.component.css']
})
export class FashionInputComponent implements OnInit {
  faPlus = faPlus;
  faDice = faDice;
  faCog = faCog;

  modalRef: BsModalRef;

  currClothing: Clothing;
  spRatingsList: ClothingArmor[];
  settings: CP2020ClothingRandomSettings = new CP2020ClothingRandomSettings();
  currSettings = this.settings;

  localStorageKey = "csd-fashion-settings";

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

  constructor(private dice: DiceService, private modalService: BsModalService) { }

  ngOnInit() {
    this.currClothing = new Clothing();
    this.spRatingsList = new Array();
    const settings = JSON.parse(localStorage.getItem(this.localStorageKey));
    if (settings) {
      this.currSettings = settings;
    }
  }


  /**
   * Randomly generate clothing
   *
   * @memberof FashionInputComponent
   */
  generate() {
    do {
      this.currClothing = new Clothing();
      this.currClothing.clothes = this.clothes[this.dice.generateNumber(0, this.clothes.length - 1)];
      // check if a default was set.
      if (this.currSettings.quality !== '') {
        this.currClothing.quality = this.qualityList.filter(q => q.name === this.currSettings.quality)[0];
      } else {
        this.currClothing.quality = this.qualityList[this.dice.generateNumber(0, this.qualityList.length - 1)];
      }
      if (this.currSettings.style !== '') {
        this.currClothing.style = this.styleList.filter(q => q.name === this.currSettings.style)[0];
      } else {
        this.currClothing.style = this.styleList[this.dice.generateNumber(0, this.styleList.length - 1)];
      }

      // set the SP rating list to randomly choose a SP
      this.setSPRatingList();
      // randomly generate SP rating
      const spMod = (this.currSettings.isArmor ? -1 : 3);
      let spRoll = this.dice.generateNumber(0, this.spRatingsList.length + spMod);
      spRoll = spRoll + (this.currSettings.isArmor ? 0 : -4);
      if (spRoll > -1) {
        this.currClothing.spRating = this.spRatingsList[spRoll];
      }

      if (this.currSettings.hasOptions) {
        // roll number of options with a low chance of getting them.
        let numOfOptions = this.dice.generateNumber(0, this.optionsList.length + 3);
        numOfOptions = numOfOptions - 3;
        if (numOfOptions > 0) {
          for (let i = 0; i < numOfOptions; i++) {
            let newOpt;
            do {
              newOpt = this.optionsList[this.dice.generateNumber(0, this.optionsList.length - 1)];
            } while (this.currClothing.options.some(opt => opt.name === newOpt.name));
            this.currClothing.options.push(newOpt);
          }
        }
      }
      //check if it can be leather
      if (typeof this.currClothing.clothes.leather !== 'undefined') {
        this.currClothing.isLeather = this.currSettings.isLeather ? true : (this.dice.generateNumber(0, 10) < 3);
      }
      this.calculateTotal();
    } while (this.currClothing.totalCost >= this.currSettings.maxCost)

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
    this.setSPRatingList();
    this.calculateTotal();
  }


  /**
   * Save the current settings to local storage.
   *
   * @memberof FashionInputComponent
   */
  changeSettings() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.currSettings));
  }

  private setSPRatingList() {
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
  }

  /**
   * Calculates the total cost of the piece of clothing.
   * Each modifier is multiplied together and then
   * multiplied the PieceOfClothing base cost.
   * @memberof FashionInputComponent
   */
  calculateTotal() {
    this.currClothing.calculateTotal();
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

  showModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
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
