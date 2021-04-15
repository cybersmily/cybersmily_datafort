import { JsonDataFiles, DataService } from './../../../services/file-services';
import { map } from 'rxjs/operators';
import { DiceService } from './../../../services/dice/dice.service';
import { Observable } from 'rxjs';
import { Cp2020PlayerCyber, Cp2020RandomCyberEntry } from './../models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cp2020CyberwareGeneratorService {

  constructor(private dice: DiceService, private data: DataService) { }

  generateCyberList(numberOfCyber: number, cyberList: Array<Cp2020PlayerCyber>): Observable<Array<Cp2020PlayerCyber>> {
    return this.data.GetJson(JsonDataFiles.CP2020_CYBERWARE_RANDOM_ENTRIES_JSON)
      .pipe(
        map((data: Array<Cp2020RandomCyberEntry>) => {
          const list = new Array<Cp2020PlayerCyber>();
          for (let i = 0; i < numberOfCyber; i++) {
            const cyber = this.rollForCyber(data, cyberList);
            if (cyber) {
              list.push(cyber);
            }
          }
          return list.sort( (a,b) => a.name.localeCompare(b.name));
        })
      );
  }

  private rollForCyber(choices: Array<Cp2020RandomCyberEntry>, cyberList: Array<Cp2020PlayerCyber>): Cp2020PlayerCyber {
    let roll = this.dice.generateNumber(0, choices.length - 1);
    const result = choices[roll];
    const cyber: Cp2020PlayerCyber = cyberList
      .filter(c => c.name.toLowerCase() === result.name.toLowerCase()
        && (c.subtype.toLowerCase() !== 'option' && c.subtype.toLowerCase() !== 'builtin')
      )[0];
    if (!cyber) {
      return undefined;
    }
    cyber.hl = (isNaN(Number(cyber.hc)) ? this.dice.rollMoreDice(cyber.hc).total : Number(cyber.hc));
    cyber.options = new Array<Cp2020PlayerCyber>();
    if (result.options) {
      const options = cyberList.filter(c => (c.type === cyber.type
        && (c.subtype.toLowerCase() === 'option'
        || c.subtype.toLowerCase() === 'builtin')));
      if (options.length > 0) {
        const numOfOptions = this.dice.generateNumber(1, ((cyber.numOptions > 0) ? cyber.numOptions : 3));
        for (let i = 0; i < numOfOptions; i++) {
          roll = this.dice.generateNumber(0, options.length - 1);
          const option = options[roll];
          option.hl = (isNaN(Number(option.hc)) ? this.dice.rollMoreDice(option.hc).total : Number(option.hc));
          cyber.options.push(option);
        }
      }
    }
    return cyber;
  }
}
