import { CpDrug, CpDrugEffect } from './cp-drug';
export class Cp2020Drug implements CpDrug{
  name: string;
  description: string;
  effects: Array<CpDrugEffect>;
  sideEffects: Array<CpDrugEffect>;
  strength: number;
  duration: string;

  constructor(param?: CpDrug) {
    this.name = (param) ? param.name : '';
    this.description = (param) ? param.description : '';
    this.effects = (param && param.effects) ? param.effects : new Array<CpDrugEffect>();
    this.sideEffects = (param && param.sideEffects) ? param.sideEffects : new Array<CpDrugEffect>();
    this.strength = (param) ? param.strength : 0;
    this.duration = (param) ? param.duration : '';
  }

  get cost(): number {
    return this.diff * 25;
  }

  get diff(): number {
    let diff: number = this.effects.reduce( (a, b) => a + b.diff, 0);
    diff += this.sideEffects.reduce( (a, b) => a + b.diff, 0);
    diff += this.strength;
    const multiplier = ( this.duration.includes('minutes') ? 2 : this.duration.includes('hours') ? 3 : 1);
    diff = diff * multiplier;
    return (diff < 2 ) ? 2 : diff;
  }

  get sideEffectList(): string {
    return this.sideEffects.map(d => d.effect).join(', ');
  }


  get effectList(): string {
    return this.effects.map(d => d.effect).join(', ');
  }

}
