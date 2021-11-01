import { ArmorCalculatorService } from '../armor-calculator/armor-calculator.service';
import { DiceService } from './../../../../services/dice/dice.service';
import {
  CP2020ArmorRandomSettings, Cp2020ArmorPiece, ArmorOption, ArmorSpChartEntry,
  ArmorAttributeLists, PieceOfClothing
} from './../../models';
import { Injectable } from '@angular/core';
import { ArmorSettingsChoices } from '../../enums';

@Injectable({
  providedIn: 'root'
})
export class ArmorGeneratorService {

  constructor(private armorCostCalculator: ArmorCalculatorService) { }

  generate(settings: CP2020ArmorRandomSettings,
    dice: DiceService,
    clothingLists: ArmorAttributeLists
  ): Cp2020ArmorPiece {

    const armor = new Cp2020ArmorPiece();
    armor.clothes = dice.rollRandomItem<PieceOfClothing>(clothingLists.clothes);

    do {
      // check if a default was set.
      if (settings?.quality !== '' ) {
        armor.quality = clothingLists.qualities.filter(q => q.name === settings?.quality)[0];
      } else {
        armor.quality = dice.rollRandomItem<ArmorOption>(clothingLists.qualities);
      }

      if (settings?.style !== '') {
        armor.style = clothingLists.styles.filter(q => q.name === settings?.style)[0];
      } else {
        armor.style = dice.rollRandomItem<ArmorOption>(clothingLists.styles);
      }

      // if both, 50/50 chance to make it armor
      let canBeArmor: boolean = (settings?.armor == ArmorSettingsChoices.both) ? dice.generateNumber(0, 1) === 1 : settings.armor == ArmorSettingsChoices.armor;
      if (canBeArmor && armor.clothes.loc !== '') {
        const spValues = clothingLists.armorChart.filter(item => item.mod[armor.clothes.wt]);
        let spRoll = dice.rollRandomItem<ArmorSpChartEntry>(spValues);
        armor.baseSP = spRoll.sp || 4;
        armor.ev = spRoll.ev[armor.clothes.wt] ?? 0;
        if(armor.clothes.loc.includes('head')) {
          armor.locations['head'] =  armor.baseSP;
        }
        if(armor.clothes.loc.includes('torso')) {
          armor.locations['torso'] =  armor.baseSP;
        }
        if(armor.clothes.loc.includes('arms')) {
          armor.locations['rarm'] =  armor.baseSP;
          armor.locations['larm'] =  armor.baseSP;
        }
        if(armor.clothes.loc.includes('legs')) {
          armor.locations['rleg'] =  armor.baseSP;
          armor.locations['lleg'] =  armor.baseSP;
        }
      }

      if (settings?.hasOptions) {
        armor.options = new Array<ArmorOption>();
        // roll number of options with a low chance of getting them.
        let numOfOptions = dice.generateNumber(0, clothingLists.options.length + 3);
        numOfOptions = numOfOptions - 3;
        for (let i = 0; i < numOfOptions; i++) {
          const newOpt = dice.rollRandomItem<ArmorOption>(clothingLists.options);
          if (!armor.options.some(opt => opt.name === newOpt.name) ) {
            armor.options.push(newOpt);
          }
        }
      }
      //check if it can be leather
      if (typeof armor.clothes?.leather !== 'undefined' && armor.cost < settings?.maxCost) {
        armor.isLeather = settings.isLeather ? true : (dice.generateNumber(0, 10) < 3);
      }
      armor.cost = this.armorCostCalculator.calculateCost(armor, clothingLists.armorChart);
    } while (armor.cost > settings?.maxCost);
    armor.name = armor.style.name;
    armor.name += ` ${armor.quality.name} `;
    armor.name += armor.baseSP > 0 ? `Armored ` : '';
    armor.name += armor.isLeather ? 'Leather ' : '';
    armor.name +=  armor.clothes.name;

    return armor;
  }

  generateArray(settings: CP2020ArmorRandomSettings,
    dice: DiceService,
    clothingLists: ArmorAttributeLists,
    count: number
  ): Array<Cp2020ArmorPiece> {
    const list = new Array<Cp2020ArmorPiece>();
    for (let i = 0; i < count; i++) {
      list.push(this.generate(settings, dice, clothingLists));
    }
    return list;
  }

}
