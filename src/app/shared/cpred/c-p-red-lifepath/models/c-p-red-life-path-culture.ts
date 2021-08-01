export class CPRedLifePathCulture {
  name: string;
  language: string;
  constructor(param?:any) {
    this.name = param?param.name:'';
    this.language = param?param.language:'';
  }
}
