import { Cp2020RandomCyberEntry } from './../../../models/cyberware/cp2020-random-cyber-entry';
import { JsonDataFiles } from './../../../json-data-files';
import { map } from 'rxjs/operators';
import { DataService } from './../../../services/data.service';
import { DiceService } from './../../../services/dice/dice.service';
import { Observable } from 'rxjs';
import { Cp2020PlayerCyber } from './../../../models/cyberware/cp2020-player-cyber';
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
          return list;
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
    cyber.options = new Array<Cp2020PlayerCyber>();
    if (result.options) {
      const options = cyberList.filter(c => (c.type === cyber.type
        && (c.subtype.toLowerCase() === 'option'
        || c.subtype.toLowerCase() === 'builtin')));
      if (options.length > 0) {
        const numOfOptions = (cyber.numOptions > 0) ? cyber.numOptions : this.dice.generateNumber(0, 3);
        for (let i = 0; i < numOfOptions; i++) {
          roll = this.dice.generateNumber(0, options.length - 1);
          cyber.options.push(options[roll]);
        }
      }
    }
    return cyber;
  }
}
