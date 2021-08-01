export class CPRedLifePathFriend {
  who: string;
  sex?: string;
  name?: string;
  notes?: string;

  constructor(param?:any){
    this.who = (param)? param.who : '';
    this.sex = (param)? param.sex : '';
    this.name = (param)? param.name : '';
    this.notes  = (param)? param.notes : '';
  }
}
