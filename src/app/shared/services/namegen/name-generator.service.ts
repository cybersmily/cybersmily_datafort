import { JsonDataFiles } from './../../json-data-files';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiceService } from '../dice/dice.service';
import { DataService } from '../data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameGeneratorService {

  names: string[];
  colors: string [];
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor(private dataService: DataService,
              private diceService: DiceService) {
    this.names = new Array<string>();
    this.colors = new Array<string>();
  }

  generateName(): Observable<string> {
    if (this.names && this.names.length > 0) {
      return this.createName();
    }
    const nameList = this.dataService.GetJson(JsonDataFiles.CP_NAMES_JSON);
    const colorList = this.dataService.GetJson(JsonDataFiles.CP_COLORS_JSON);
    forkJoin( [nameList, colorList]).subscribe( results => {
      this.names = results[0].names;
      this.colors = results[1];
      return this.createName();
    });
  }

  private createName(): Observable<string> {
    let roll = this.diceService.generateNumber(0, this.names.length - 1);
    let name = this.names[roll];
    roll = this.diceService.generateNumber(1, 10);
    if (roll > 4 && roll < 8) {
      roll = this.diceService.generateNumber(1, 4);
      if ( roll > 3 ) {
        roll = this.diceService.generateNumber(0, this.characters.length - 1);
        name += '-' + this.characters[roll];
      } else {
        roll = this.diceService.generateNumber(0, this.colors.length - 1);
        name += '-' + this.colors[roll];
      }
      return of(name);

    } else if (roll > 7) {
      roll = this.diceService.generateNumber(1, 4);
      if ( roll > 3 ) {
        roll = this.diceService.generateNumber(0, this.characters.length - 1);
        name = this.characters[roll] + '-' + name;
      } else {
        roll = this.diceService.generateNumber(0, this.colors.length - 1);
        name = this.colors[roll] + ' ' + name;
      }
    }
    roll = this.diceService.generateNumber(1, 4);
    if ( roll === 1 ) {
      if (name.includes('i')) {
        name = name.replace('i', 'y');
      } else if (name.includes('y')) {
        name = name.replace('y', 'i');
      }
    }
    if (roll === 2) {
      name = name.replace('s', 'z');
    }
    return of(name);
  }
}
