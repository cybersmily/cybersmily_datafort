export class CPRedLifePathEnemy {
  who: string;
  cause: string;
  resources: string;
  reaction: string;
  sex: string;
  name: string;
  notes: string;

  constructor(param?: any){
    this.who = param?param.who: '';
    this.cause = param?param.cause: '';
    this.resources = param?param.resources: '';
    this.reaction = param?param.reaction: '';
    this.sex = param?param.sex: '';
    this.name = param?param.name: '';
    this.notes = param?param.notes: '';
  }
}
