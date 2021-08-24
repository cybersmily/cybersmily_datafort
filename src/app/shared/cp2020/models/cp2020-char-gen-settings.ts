export class Cp2020CharGenSettings {
  isIU: boolean;
  isCollapsed: boolean;
  lifePathSource: string;
  lifePathEvents: boolean;
  lifePathYears: number;


  constructor(param?:any) {
    this.isIU = param?.isIU || false;
    this.isCollapsed = param?.isCollapsed || false;
    this.lifePathSource = param?.lifePathSource || 'CP2020';
    this.lifePathEvents = param?.lifePathEvents || false;
    this.lifePathYears = param?.lifePathYears || 0;
  }
}
