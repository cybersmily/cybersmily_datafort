import { map } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { DataService, JsonDataFiles } from './../file-services';
import { DiceService } from './../dice/dice.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CPHeadlinesGeneratorService {
  private _chart: {topics: Array<string>, subjects: Array<string>, verbs: Array<string>};
  private _headlines: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>(new Array<string>());
  headlines: Observable<Array<string>> = this._headlines.asObservable();

  constructor(private dice: DiceService, private dataService: DataService) { }

  generate(numOfHeadlines: number) {
    if(this._chart) {
      this.rollHeadlines(numOfHeadlines);
    } else {
    this.dataService.GetJson(JsonDataFiles.CP_HEADLINES_JSON)
    .subscribe(data => {
        this._chart = data;
        this.rollHeadlines(numOfHeadlines);
      });
    }
  }

  clear() {
    this._headlines.next(new Array<string>());
  }

  getList(): Array<string> {
    return this._headlines.getValue();
  }

  private rollHeadlines(numOfHeadlines: number) {
    const headlines = [...this._headlines.getValue()];
    for(let i = 0; i < numOfHeadlines; i++) {
      headlines.push(this.generateHeadline());
    }
    this._headlines.next(headlines.sort((a,b) => a.localeCompare(b)));
  }

  private generateHeadline(): string {
    let die = this.dice.generateNumber(0, this._chart.topics.length - 1);
    const topic = this._chart.topics[die].toLocaleUpperCase();

    let num = this.dice.generateNumber(0, 1);
    const subject = this.generateSubject(num);

    die = this.dice.generateNumber(0, this._chart.verbs.length - 1);
    const verb = this._chart.verbs[die][num];

    num = this.dice.generateNumber(0, 1);
    const objective = this.generateSubject(num);

    return `${topic} - ${subject} ${verb} ${objective}`;
  }

  private generateSubject(num: number): string {
    let result = '';
    do {
      const die = this.dice.generateNumber(0, this._chart.subjects.length - 1);
      result = this._chart.subjects[die][num];
    } while(result === '');
    return result;
  }
}
