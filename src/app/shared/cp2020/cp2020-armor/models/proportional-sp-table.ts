export class ProportionalSpTable {
  static calculateNewSP(spFirst: number, spSecond: number): number {
    const delta = Math.abs(spFirst - spSecond);
    return delta + (spFirst > spSecond ? spFirst : spSecond);
  }

  private static getBonusNumber(delta: number): number {
    if (delta >= 0 && delta < 5) {
      return 5;
    }
    if (delta >= 5 && delta < 9) {
      return 4;
    }
    if (delta >= 9 && delta < 15) {
      return 3;
    }
    if (delta >= 15 && delta < 21) {
      return 2;
    }
    if (delta >= 21 && delta < 26) {
      return 1;
    }
    return 0;
  }
}
