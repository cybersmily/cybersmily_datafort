export class LifepathMotivations {
  personality: string;
  valuedperson: string;
  valuemost: string;
  feelaboutpeople: string;
  valuedpossession: string;

  constructor(param?:any) {
    this.personality = (param && param.personality) ? param.personality : '';
    this.valuedperson = (param && param.valuedperson) ? param.valuedperson : '';
    this.valuemost = (param && param.valuemost) ? param.valuemost : '';
    this.feelaboutpeople = (param && param.feelaboutpeople) ? param.feelaboutpeople : '';
    this.valuedpossession = (param && param.valuedpossession) ? param.valuedpossession : '';
  }
}
