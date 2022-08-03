export class CpRedCharacterCriticalInjury {
  name: string;
  effect: string;
  fix: string;
  treatment: string;

  constructor(param?: any) {
    this.name = param?.name ?? '';
    this.effect = param?.effect ?? '';
    this.fix = param?.fix ?? '';
    this.treatment = param?.treatment ?? '';
  }
}
