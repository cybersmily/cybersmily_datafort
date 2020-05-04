export class CpRedBaseStat {
  private _base: number;
  adjusted: number;

  constructor() {
    this._base  = 0;
    this.adjusted = 0;
  }

  get base(): number {
    return this._base;
  }

  get current(): number {
    return this.base + this.adjusted;
  }
  set(value: number) {
    this._base  = (value < 0) ? 0 : value;
    this.adjusted = 0;
  }
}
