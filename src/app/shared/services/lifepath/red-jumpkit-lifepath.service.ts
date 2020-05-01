import { LifepathEventsList } from './../../models/lifepath/lifepath-events-list';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { CPRedLifepathData } from './../../models/lifepath/cpred-lifepath-data';
import { Injectable } from '@angular/core';
import { DiceService } from './../dice/dice.service';
import { DataService } from '../data.service';
import { CPRedLifepath } from '../../models/lifepath/cpred-lifepath';

@Injectable({
  providedIn: 'root'
})
export class RedJumpkitLifepathService {

  private lifePathData: CPRedLifepathData;
  private lifePath: CPRedLifepath;

  constructor(private dice: DiceService, private dataService: DataService) {}

  GetLifePathData(): Observable<CPRedLifepathData> {
    if (this.lifePathData) {
      return of(this.lifePathData);
    } else {
      return this.dataService
      .GetJson('/json/apps/lifepath/cpredjkchart.json')
      .pipe( map( (data) => {
        this.lifePathData = data;
        return this.lifePathData;
      }));
    }
  }

  GenerateLifePath(): Observable<CPRedLifepath> {
    if (this.lifePathData) {
      this.lifePath = this.generateLifePathObject();
      return of(this.lifePath);
    }

    return this.GetLifePathData()
    .pipe(
      map( (data) => {
        this.lifePath = this.generateLifePathObject();
        return this.lifePath;
      }));
  }

  private generateLifePathObject(): CPRedLifepath {
    const lifePath = new CPRedLifepath();
    lifePath.background = this.GenerateBackground();
    lifePath.motivation = this.GenerateMotivation();
    lifePath.goals = this.GenerateGoals();
    lifePath.friends = this.GenerateFriends();
    lifePath.enemies = this.GenerateEnemies();
    lifePath.romance = this.GenerateRomance();
    lifePath.personality = this.GeneratePersonality();
    return lifePath;
  }

  GenerateBackground(): string {
    return this.dice.rollOnChart(this.lifePathData, 'background');
  }

  GenerateMotivation(): string {
    return this.dice.rollOnChart(this.lifePathData, 'motivation');
  }

  GenerateGoals(): string {
    return this.dice.rollOnChart(this.lifePathData, 'goals');
  }

  GenerateFriends(): string[] {
    let noOfFriends = this.dice.generateNumber(1, 10) - 7;
    noOfFriends = (noOfFriends < 1) ? 1 : noOfFriends;
    const friends = [];
    for ( let i = 0; i < noOfFriends; i++ ) {
      const friend = this.dice.rollOnChart(this.lifePathData, 'friends');
      if ( friend && friend !== '' && friend !== ' ') {
        friends.push(friend);
      }
    }
    return friends;
  }

  GenerateEnemies(): string[] {
    let noOfEnemies = this.dice.generateNumber(1, 10) - 5;
    noOfEnemies = (noOfEnemies < 1) ? 1 : noOfEnemies;
    const enemies = [];
    for ( let i = 0; i < noOfEnemies; i++ ) {
      const enemy = this.dice.rollOnChart(this.lifePathData, 'enemies');
      if ( enemy && enemy !== '' && enemy !== ' ') {
        enemies.push(enemy);
      }
    }
    return enemies;
  }

  GeneratePersonality(): string {
    return this.dice.rollOnChart(this.lifePathData, 'personality');
  }

  GenerateRomance(): string {
    return this.dice.rollOnChart(this.lifePathData, 'romance');
  }
}
