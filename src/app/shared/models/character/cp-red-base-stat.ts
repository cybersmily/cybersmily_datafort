export class CpRedBaseStat {
  base: number;
  adjusted: number;
  current: number;

  constructor() {
    this.base  = 0;
    this.adjusted = 0;
    this.current = 0;
  }

  set(value: number) {
    this.base  = value;
    this.adjusted = 0;
    this.current = this.base + this.adjusted;
  }
}
