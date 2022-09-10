import { HotStuffContact } from './hot-stuff-contact';

export class HotStuffArea implements HotStuffContact {
  area: string;
  private _rolls: number;
  private _points: number;
  details: string;

  constructor(param?: any) {
    this.area = param?.area ?? '';
    this._rolls = param?._rolls ?? 0;
    this._points = this.setPoints(this._rolls);
    this.details = param?.details ?? '';
  }

  get rolls(): number {
    return this._rolls;
  }

  set rolls(value: number) {
    this._rolls = value > 6 || value < 0 ? 0 : value;
    this._points = this.setPoints(this._rolls);
  }

  get points(): number {
    return this._points;
  }

  private setPoints(rolls: number): number {
    switch (rolls) {
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
