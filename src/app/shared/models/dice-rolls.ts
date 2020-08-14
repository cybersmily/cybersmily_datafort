export class DiceRolls {
    total: number;
    rolls: number[];
    mod?: string;

    constructor() {
      this.total = 0;
      this.rolls = new Array<number>();
      this.mod = undefined;
    }

    /**
     * Adds two DiceRolls objects together.
     *
     * @param {DiceRolls} d - DiceRolls object to add to current
     * @memberof DiceRolls
     */
    add ( d: DiceRolls ) {
      if (typeof(d.total) !== 'undefined' && typeof(d.rolls) !== 'undefined') {
        this.total += d.total;
        Array.prototype.push.apply(this.rolls, d.rolls);
      }
    }

    /**
     * Substracts a DiceRolls from the this dice roll.
     *
     * @param {DiceRolls} d - DiceRolls to subtract
     * @memberof DiceRolls
     */
    subtract(d: DiceRolls) {
      if (typeof (d.total) !== 'undefined' && typeof (d.rolls) !== 'undefined') {
        this.total -= d.total;
        Array.prototype.push.apply(this.rolls, d.rolls);
      }
    }

    /**
     * Multiplies this DiceRolls by the passed in DiceRolls.
     *
     * @param {DiceRolls} d - DiceRolls to multiply by
     * @memberof DiceRolls
     */
    multiply(d: DiceRolls) {
      if (typeof (d.total) !== 'undefined' && typeof (d.rolls) !== 'undefined') {
        this.total *= d.total;
        Array.prototype.push.apply(this.rolls, d.rolls);
      }
    }

    /**
     * Shows the total and the dice rolls that were done.
     *
     * @returns {string} - Total: # (dice rolls)
     * @memberof DiceRolls
     */
  show(showType?: boolean): string {
    let results = `Total: ${this.total} [Dice: (${this.rolls.join(', ')})${
        this.mod ? this.mod : ''
      }]`;
    if (showType && this.rolls[0] === 1) {
      results += ' Fumbled!';
    }
    if (showType && this.rolls[0] === 10) {
      results += ' Critical Succcess!';
    }
    return results;
  }
}
