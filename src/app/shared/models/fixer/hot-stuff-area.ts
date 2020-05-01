
export class HotStuffArea {
  area: string;
  rolls: number;
  details: string;
  constructor() {
    this.area = '';
    this.rolls = 0;
    this.details = '';
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
