import { JsonDataFiles, DataService } from './../../../services/file-services';
import { map } from 'rxjs/operators';
import { DiceService } from './../../../services/dice/dice.service';
import { Observable } from 'rxjs';
import { Cp2020PlayerCyber, Cp2020RandomCyberEntry } from './../models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cp2020CyberwareGeneratorService {
  constructor(private dice: DiceService, private data: DataService) {}

  /**
   * Generates a random list of cyberware based on the cyberList parameter and
   * the cyberware random entries file.
   *
   * @param {number} numberOfCyber - number of pieces of Cyberware to generate
   * @param {Array<Cp2020PlayerCyber>} cyberList - list of cyberware to pull from
   * @return {*}  {Observable<Array<Cp2020PlayerCyber>>}
   * @memberof Cp2020CyberwareGeneratorService
   */
  generateCyberList(
    numberOfCyber: number,
    cyberList: Array<Cp2020PlayerCyber>,
    ignoreList?: Array<Cp2020PlayerCyber>
  ): Observable<{results: Array<Cp2020PlayerCyber>, noMore: boolean}> {
    return this.data
      .GetJson(JsonDataFiles.CP2020_CYBERWARE_RANDOM_ENTRIES_JSON)
      .pipe(
        map((data: Array<Cp2020RandomCyberEntry>) => {
          // clear out random entry from provide list
          if(ignoreList) {
            ignoreList.forEach(cyber => {
              data = data.filter(entry => !entry.name.startsWith(cyber.name.replace(/\s+[I]*$/g,'')));
            })
          }

          const list = this.generateResults(
            numberOfCyber,
            data,
            cyberList,
            ignoreList ?? new Array<Cp2020PlayerCyber>()
          );
          return {results: list.sort((a, b) => a.name.localeCompare(b.name)), noMore: data.length < 1};
        })
      );
  }

  /**
   * this is a recursive function to generate a list of cyberware
   *
   * @param {number} count
   * @param {Array<Cp2020RandomCyberEntry>} choices
   * @param {Array<Cp2020PlayerCyber>} cyberList
   * @param {Array<Cp2020PlayerCyber>} results
   * @return {*}  {Array<Cp2020PlayerCyber>}
   * @memberof Cp2020CyberwareGeneratorService
   */
  generateResults(
    count: number,
    choices: Array<Cp2020RandomCyberEntry>,
    cyberList: Array<Cp2020PlayerCyber>,
    results: Array<Cp2020PlayerCyber>
  ): Array<Cp2020PlayerCyber> {
    // check to see if no more are needed or the available choices are used up
    if (count < 1 || choices.length < 1) {
      return results;
    }

    // randomly generate the piece of cyberware
    let roll = this.dice.generateNumber(0, choices.length - 1);
    const result = choices[roll];
    // if random cyber is already part of the list, reroll for it.
    if (results.some((cyber) => cyber.name.startsWith( result.name.replace(/\s[I]+$/g,'')))) {
      return this.generateResults(count, choices, cyberList, results);
    }

    // remove the random cyber from the choice of options
    choices = choices.filter((opt) => {
      return !opt.name.startsWith( result.name.replace(/\s+[I]*$/g,''))
    });

    // find the piece of cyber from the master data list
    const cyber: Cp2020PlayerCyber = cyberList.filter(
      (c) => c.name.toLowerCase() === result.name.toLowerCase().replace(', right', '').replace(', left','')
    )[0];
    // if the piece wasn't found in the master data list, reroll
    if (!cyber) {
      return this.generateResults(count, choices, cyberList, results);
    }

    // add back missing right/left
    cyber.name = result.name;

    // randomly generate options for the cyberware if needed
    if (result.options) {
      const optionList = cyberList.filter(
        (c) =>
          c.type === cyber.type &&
          (c.subtype.toLowerCase() === 'option' ||
            c.subtype.toLowerCase() === 'builtin')
      );
      if (optionList.length > 0) {
        const numOfOptions = this.dice.generateNumber(
          1,
          cyber.numOptions > 0 ? cyber.numOptions : 3
        );
        cyber.options = this.generateResults(
          numOfOptions,
          optionList.map((opt) => ({ name: opt.name, options: false })),
          optionList,
          new Array<Cp2020PlayerCyber>()
        );
      }
    }

    results.push(cyber);
    count -= 1;
    // lower the count and roll again
    return this.generateResults(count, choices, cyberList, results);
  }
}
