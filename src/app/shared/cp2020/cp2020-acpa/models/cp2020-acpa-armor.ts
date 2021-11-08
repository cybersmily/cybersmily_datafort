import { ACPAArmor } from './acpa-armor';
export class Cp2020AcpaArmor implements ACPAArmor {
  sp:number;
  weight:number;
  cost:number;

  constructor(param?: ACPAArmor) {
    this.sp = param?.sp ?? 0;
    this.weight = param?.weight ?? 0;
    this.cost = param?.cost ?? 0;
  }

}
