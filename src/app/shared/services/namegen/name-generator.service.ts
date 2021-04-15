import { map } from 'rxjs/operators';
import { JsonDataFiles } from './../file-services';
import { Observable, of, forkJoin } from 'rxjs';
import { DiceService } from '../dice/dice.service';
import { DataService } from './../file-services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameGeneratorService {

  private names: string[];
  private colors: string [];
  private characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor(private dataService: DataService,
              private diceService: DiceService) {
  }

  generateName(): Observable<string> {
    if (this.names && this.names.length > 0 && this.colors && this.colors.length > 0) {
      return of(this.createName());
    } else {
      const nameList = this.dataService.GetJson(JsonDataFiles.CP_NAMES_JSON);
      const colorList = this.dataService.GetJson(JsonDataFiles.CP_COLORS_JSON);
      return forkJoin( [nameList, colorList]).pipe( map( results => {
        this.names = results[0];
        this.colors = results[1];
        return this.createName();
      }));
    }
  }

  private createName(): string {
    let roll = this.diceService.generateNumber(0, this.names.length - 1);
    let name = this.names[roll];
    roll = this.diceService.generateNumber(1, 10);
    if ( roll < 5) {
      return name;
    }
    if (roll < 8) {
      roll = this.diceService.generateNumber(1, 10);
      if ( roll > 6 ) {
        roll = this.diceService.generateNumber(0, this.characters.length - 1);
        name += '-' + this.characters[roll];
      } else {
        roll = this.diceService.generateNumber(0, this.colors.length - 1);
        name += '-' + this.colors[roll];
      }
      return name;
    }
    return this.switchUpLetters(name);
  }

  private switchUpLetters(name: string): string {
    const roll = this.diceService.generateNumber(1, 3);
    if ( roll > 2 ) {
      if (name.includes('i')) {
        return name.replace('i', 'y');
      } else if (name.includes('y')) {
        return name.replace('y', 'i');
      } else {
        return name.replace('s', 'z');
      }
    }
    return name;
  }
}
