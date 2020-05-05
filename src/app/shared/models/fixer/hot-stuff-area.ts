
export class HotStuffArea {
  area: string;
  private _rolls: number;
  details: string;
  constructor() {
    this.area = '';
    this._rolls = 0;
    this.details = '';
  }

  get rolls(): number {
    return this._rolls;
  }

  set rolls(value: number) {
    this._rolls = ( value > 6 || value < 0) ? 0 : value;
  }

  get points(): number {
    switch (this.rolls) {
      case 1:
        return 4;
      case 2:
        return 8;
      case 3:
        return 16;
      case 4:
        return 32;
      case 5:
        return 64;
      case 6:
        return 128;
      default:
        return 0;
    }
  }
}
