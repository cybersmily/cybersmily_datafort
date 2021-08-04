export class LifepathEthnicity {
  name: string = '';
  language: string = '';

  constructor(param?: any) {
    this.name = (param && param.name) ? param.name : '';
    this.language = (param && param.language) ? param.language : '';

  }
}
