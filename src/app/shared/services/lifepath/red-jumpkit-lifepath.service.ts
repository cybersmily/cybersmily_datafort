import { JsonDataFiles } from './../../json-data-files';
import { LifepathEventsList } from './../../models/lifepath/lifepath-events-list';
import { map } from 'rxjs/operators';
import { of, Observable, forkJoin } from 'rxjs';
import { CPRedLifepathData } from './../../models/lifepath/cpred-lifepath-data';
import { Injectable } from '@angular/core';
import { DiceService } from './../dice/dice.service';
import { DataService } from '../data.service';
import { CPRedLifepath } from '../../models/lifepath/cpred-lifepath';

@Injectable({
  providedIn: 'root'
})
export class RedJumpkitLifepathService {

  private _lifePathData: CPRedLifepathData;
  private _lifePath: CPRedLifepath;

  constructor(private dice: DiceService, private dataService: DataService) {}

  private get lifePathData(): Observable<CPRedLifepathData> {
    if (this._lifePathData) {
      return of(this._lifePathData);
    } else {
      return this.dataService
      .GetJson(JsonDataFiles.CPRED_LIFEPATH_CHART_JSON)
      .pipe( map( (data) => {
        this._lifePathData = data;
        return this._lifePathData;
      }));
    }
  }

  generateLifePath(): Observable<CPRedLifepath> {
    return this.generateLifePathObject();
  }

  generateBackground(): Observable<string> {
    return this.lifePathData.pipe(
      map( (data) => {
        return this.rollchart(data, 'background');
    }));
  }

  generateMotivation(): Observable<string> {
    return this.lifePathData.pipe(
      map( (data) => {
        return this.rollchart(data, 'motivation');
    }));
  }

  generateGoals(): Observable<string> {
    return this.lifePathData.pipe(
      map( (data) => {
        return this.rollchart(data, 'goals');
    }));
  }

  generateFriends(): Observable<Array<string>> {
    return this.lifePathData.pipe(
      map( (data) => {
        let noOfFriends = this.dice.generateNumber(1, 10) - 7;
        noOfFriends = (noOfFriends < 1) ? 1 : noOfFriends;
        const friends = new Array<string>();
        for ( let i = 0; i < noOfFriends; i++ ) {
          const friend = this.rollchart(data, 'friends');
          if ( friend && friend !== '' && friend !== ' ') {
            friends.push(friend);
          }
        }
        return friends;
    }));
  }

  generateEnemies(): Observable<Array<string>> {
    return this.lifePathData.pipe(
      map( (data) => {
        let noOfEnemies = this.dice.generateNumber(1, 10) - 5;
        noOfEnemies = (noOfEnemies < 1) ? 1 : noOfEnemies;
        const enemies = new Array<string>();
        for ( let i = 0; i < noOfEnemies; i++ ) {
          const enemy = this.rollchart(data, 'enemies');
          if ( enemy && enemy !== '' && enemy !== ' ') {
            enemies.push(enemy);
          }
        }
      return enemies;
    }));
  }

  generatePersonality(): Observable<string> {
    return this.lifePathData.pipe(
      map( (data) => {
        return this.rollchart(data, 'personality');
    }));
  }

  generateRomance(): Observable<string> {
    return this.lifePathData.pipe(
      map( (data) => {
        return this.rollchart(data, 'romance');
    }));
  }

  private rollchart(chart: CPRedLifepathData, section: string): string {
    return this.dice.rollOnChart(chart, section);
  }

  private generateLifePathObject(): Observable<CPRedLifepath> {
    return forkJoin([
      this.generateBackground(),
      this.generateMotivation(),
      this.generateGoals(),
      this.generateFriends(),
      this.generateEnemies(),
      this.generateRomance(),
      this.generatePersonality(),
    ]).pipe(
      map( data => {
        const newLifePath = new CPRedLifepath();
        newLifePath.background = data[0].toString();
        newLifePath.motivation = data[1].toString();
        newLifePath.goals = data[2].toString();
        newLifePath.friends = data[3] as Array<string>;
        newLifePath.enemies = data[4] as Array<string>;
        newLifePath.romance = data[5].toString();
        newLifePath.personality = data[6].toString();
        return newLifePath;
    }));
  }
}
