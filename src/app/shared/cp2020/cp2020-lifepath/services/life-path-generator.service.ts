import { map } from 'rxjs/operators';
import { MotivationGeneratorService } from './motivation-generator.service';
import { StyleGeneratorService } from './style-generator.service';
import { EthnicityGeneratorService } from './ethnicity-generator.service';
import { FamilyGeneratorService } from './family-generator.service';
import { Observable, of, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { LifePathResults } from './../models';
import { LifeEventsGeneratorService } from './life-events-generator.service';

@Injectable({
  providedIn: 'root'
})
export class LifePathGeneratorService {

  constructor(
    private family: FamilyGeneratorService,
    private ethnicity: EthnicityGeneratorService,
    private style: StyleGeneratorService,
    private motivation: MotivationGeneratorService,
    private lifeEvents: LifeEventsGeneratorService,
  ) { }

  generateLifePath(source: string, alwaysEvents: boolean, years: string): Observable<LifePathResults> {
    const lifepath = new LifePathResults();
    const familyService = this.family.GenerateFamily(source);
    const ethnicityService = this.ethnicity.GenerateEthnicity(source);
    const lifeEventService = this.lifeEvents.GenerateLifeEvents(source, years, alwaysEvents);
    const motivationService = this.motivation.GenerateMotivation(source);
    const styleService = this.style.GenerateStyles(source);
    return forkJoin([
      familyService,
      ethnicityService,
      lifeEventService,
      motivationService,
      styleService
    ])
    .pipe( map( results => {
      lifepath.family = results[0];
      lifepath.ethnicity = results[1][0];
      lifepath.events = results[2].Events;
      const missingEvents: number = 12 - lifepath.events.length;
      for (let i = 0; i < missingEvents; i++) {
        lifepath.events.push( {age: 0, event: ''});
      }
      lifepath.motivations = results[3];
      lifepath.appearance = results[4];
      return lifepath;
    }));
  }
}
