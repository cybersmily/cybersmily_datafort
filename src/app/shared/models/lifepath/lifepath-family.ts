import { Siblings } from './lifepath-siblings';

export class LifepathFamily {
  familyRanking: string = '';
  familyBackground: string = '';
  siblings: Siblings = new Siblings();

  constructor(param?: any) {
    this.familyRanking = (param && param.familyRanking) ? param.familyRanking : '';
    this.familyBackground = (param && param.familyBackground) ? param.familyBackground : '';
    this.siblings = (param && param.siblings) ? new Siblings(param.siblings) : new Siblings();
  }

}
