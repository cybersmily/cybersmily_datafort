import { DiceService } from './../../../../services/dice/dice.service';
import { Injectable } from '@angular/core';
import { Cp2020ArmorPiece } from './../../models';

@Injectable({
  providedIn: 'root'
})
export class ArmorRandomSelectorService {

  constructor(private dice: DiceService) { }

  generate(armorList: Array<Cp2020ArmorPiece>): Cp2020ArmorPiece {
    const selectedArmor = this.dice.rollRandomItem(armorList);
    return new Cp2020ArmorPiece(selectedArmor);
  }

  generateList(armorList: Array<Cp2020ArmorPiece>, count: number): Array<Cp2020ArmorPiece> {
    const armorArray = new Array<Cp2020ArmorPiece>();
    for(let i = 0; i < count; i++) {
      let armor = new Cp2020ArmorPiece();
      let armorName = '';
      // make sure there are no duplicates add to list
      do {
        armorName = armor.name;
        armor = this.generate(armorList);
      } while(armor.name === armorName);
      armorArray.push();
    }
    return armorArray.sort((a, b) => a.name.localeCompare(b.name));
  }
}
