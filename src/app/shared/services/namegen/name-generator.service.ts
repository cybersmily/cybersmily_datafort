import { JsonDataFiles } from './../../json-data-files';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiceService } from '../dice/dice.service';
import { DataService } from '../data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameGeneratorService {

  names: string[];

  constructor(private dataService: DataService,
              private diceService: DiceService) {
    this.names = new Array<string>();
  }

  generateName(): Observable<string> {
    if (this.names && this.names.length > 0) {
      const roll = this.diceService.generateNumber(0, (this.names.length - 1));
      return of(this.names[roll]);
    }
    return this.dataService.GetJson(JsonDataFiles.CP_NAMES_JSON).pipe(
      map( data => {
        this.names = data.names;
        const roll = this.diceService.generateNumber(0, (this.names.length - 1));
        return this.names[roll];
      })
    );
  }
}
