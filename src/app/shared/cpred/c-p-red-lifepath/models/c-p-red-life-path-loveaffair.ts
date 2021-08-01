export class CPRedLifePathLoveaffair {
  kind: string;
  sex: string;
  name: string;
  notes: string;

  constructor(param?:any){
    this.kind = (param)? param.kind : '';
    this.sex = (param)? param.sex : '';
    this.name = (param)? param.name : '';
    this.notes  = (param)? param.notes : '';
  }
}
