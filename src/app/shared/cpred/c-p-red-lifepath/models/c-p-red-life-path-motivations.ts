export class CPRedLifePathMotivations {
  personality: string;
  valueMost: string;
  valuedPossession: string;
  valuedPerson: string;
  feelAboutPeople: string;
  goal: string;

  constructor(param?:any) {
    this.personality = param? param.personality:'';
    this.valueMost = param? param.valueMost:'';
    this.valuedPossession = param? param.valuedPossession:'';
    this.valuedPerson = param? param.valuedPerson:'';
    this.feelAboutPeople = param? param.feelAboutPeople:'';
    this.goal = param? param.goal:'';
  }
}
