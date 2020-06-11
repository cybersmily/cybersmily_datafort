import { CpDrug, CpDrugEffect } from './cp-drug';
export class Cp2020Drug implements CpDrug{
  name: string;
  description: string;
  effects: Array<CpDrugEffect>;
  sideEffects: Array<CpDrugEffect>;
  strength: number;
  duration: string;

  constructor() {
    this.name = '';
    this.description = '';
    this.effects = new Array<CpDrugEffect>();
    this.sideEffects = new Array<CpDrugEffect>();
    this.strength = 0;
    this.duration = '';
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
    return this.sideEffects.map(d => d.effect).join(',');
  }


  get effectList(): string {
    return this.effects.map(d => d.effect).join(',');
  }

}
