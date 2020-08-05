import {
  DiceRolls
} from './../../models/dice-rolls';
import {
  Injectable
} from '@angular/core';

@Injectable()
export class DiceService {

  constructor() {}

  /**
   * This is for complex dice rolls.
   * @param {string} str string of what to roll
   * @returns {DiceRolls} the dice rolls that were done.
   * @memberof DiceService
   */
  rollMoreDice(str: string): DiceRolls {
    return this.recurse(str);
  }

  /**
   * This is a simple dice formula that uses just d rolls.
   * Ex. 12d6 or 3d4
   * This only allows dice rolls, does not allow modifiers
   * such as 2d6+3
   * @param {string} str dice to roll.
   * @returns {DiceRolls} The results of the dice roll
   * @memberof DiceService
   */
  rollDice(str: string): DiceRolls {
    const r: DiceRolls = new DiceRolls();
    if (str.toLowerCase().indexOf('d') > -1) {
      const n = str.toLowerCase().split('d');
      const o = parseInt(n[0], 0);
      const d = parseInt(n[1], 0);
      if (!isNaN(o) && !isNaN(d)) {
        for (let i = 0; i < o; i++) {
          const m = this.generateNumber(1, d);
          r.rolls.push(m);
          r.total += m;
        }
      }
    } else {
      const v: number = Number(str);
      if (!isNaN(v)) {
        r.total = v;
        r.rolls.push(v);
      } else {
        console.log('Dice roll cannot be parsed.');
      }

    }
    return r;
  }

  /**
   *Generate a random number between the min and max parameters.
   * @param {number} min - minimum value to return
   * @param {number} max - maximum value to return
   * @returns {number} - a number between min and max.
   * @memberof DiceService
   */
  generateNumber(min: number, max: number): number {
    // to make it more random, using the milliseconds to add more randomness
    const ms: number = Date.now() * Math.random();
    const rand = Math.floor(Math.random() * ms);
    // generate number between min and max.
    // Then add 1 to bring number to max and add min
    const roll = (rand % (max - min + 1)) + min;
    return roll;
  }

  private performOperation(str: string, val: DiceRolls): DiceRolls {
    if (str.match(/[\/\+\*\-]\d+/g) && typeof (val.total) !== 'undefined') {
      val.mod = str;
      const b = str.split(/[\/\+\*\-]/)[1];
      const c = str.match(/[\/\+\*\-]/);
      if (/^\d+d\d+$/i.test(b)) {
        // add/substract/multiple the dice rolls.
        switch (c[0]) {
          case '*':
            val.multiply(this.rollDice(b));
            break;
          case '+':
            val.add(this.rollDice(b));
            break;
          case '-':
            val.subtract(this.rollDice(b));
            break;
        }
      } else {
        const e = Number(b);
        if (!isNaN(e)) {
          switch (c[0]) {
            case '/':
              val.total = val.total / e;
              break;
            case '*':
              val.total *= e;
              break;
            case '+':
              val.total += e;
              break;
            case '-':
              val.total -= e;
              break;
          }
        }
      }
    }
    return val;
  }

  /**
   * recursively go through a dice formula to generate dicerolls.
   * ex. (3d6+4) + (4d8 -1)
   * @private
   * @param {string} str string to parse for the dice rolls
   * @returns {DiceRolls} DiceRolls of the formula
   * @memberof DiceService
   */
  private recurse(str: string): DiceRolls {
    let total = new DiceRolls();
    const regDice = /\d+d\d+/i;
    const regDiceOp = /\d+d\d+[\+\*\/\-]\d+/i;
    if (str && str.indexOf('(') > -1) {
      // if there are parenthesis, then recurse through the statement
      let t = 1;
      const a = parseInt(str.substring(0, str.indexOf('(')), 0);
      t = isNaN(a) ? 1 : a;
      for (let i = 0; i < t; i++) {
        total.add(this.recurse(str.substring(str.indexOf('(') + 1, str.lastIndexOf(')'))));
      }
      const d = str.substring(str.lastIndexOf(')') + 1);
      total = this.performOperation(d, total);
    } else if (regDiceOp.test(str)) {
      const e = str.split(/[\+\*\/-]/g);
      total = this.rollDice(e[0]);
      total = this.performOperation(str.replace(e[0], ''), total);

    } else if (regDice.test(str)) {
      // if string is just a dice, then roll them.
      return this.rollDice(str);
    }
    return total;

  }

  /**
   * randomValue selects a random value from within the provided option.
   * if the option is 'Roll 2', then it will return 2 different values
   * or one if the same options is rolled again on the second roll.
   * @param {string[]} options - array to choose a random value from
   * @returns {string} - the option that is random choosen.
   * @memberof LifepathChartComponent
   */
  getRandomValue(options: string[]): string {
    // generate a random value
    const rn: number = Math.floor(Math.random() * options.length);
    let choosen: string = options[rn];
    // if the option is Roll 2, then roll twice on the chart.
    if (choosen === 'Roll 2') {
      options.splice(rn, 1);
      choosen = this.getRandomValue(options);
      const secondOption = this.getRandomValue(options);
      if (choosen !== secondOption) {
        return `${choosen}/${secondOption}`;
      }
    }
    return choosen;
  }

/**
 * processResult will parse the string and generate random options
 * within the text. Fomrating for the string is [[]] or [{}] can
 * be used as well a |. This will have random dice rolled to
 * determine what option to use, then replace in the string. *
 * @param {string} r - string to parse and modify
 * @returns {string} - string with the parse options.
 * @memberof DiceService
 */
processResult(r: string): string {
    let c: string = r;
    if (typeof (c) !== 'undefined' && c.indexOf('[[') > -1) {
      const b: string = c.substring(0, c.indexOf('[['));
      const d: string = c.substring(c.indexOf('[[') + 2, c.indexOf(']]'));
      const e: string = c.substring(c.indexOf(']]') + 2);
      const t: string[] = d.split('|');
      c = b + t[this.generateNumber(0, (t.length - 1))] + this.processResult(e);
    }
    if (typeof (c) !== 'undefined' && c.indexOf('[{') > -1) {
      const d: string = c.substring(c.indexOf('[{') + 2, c.indexOf('}]'));
      const i: number = parseInt(d.split(':')[1], 10);
      const n: number = parseInt(d.split(':')[0], 10);
      if (!isNaN(i) && !isNaN(n)) {
        const max = (n * 10);
        const dieRoll = this.generateNumber(n, max) * i;
        c = c.replace('[{' + d + '}]', dieRoll.toString());
      }
    }
    return c;
  }

  /**
   * rollOnChart will randomly choose an option from the cp chart. Format of
   * the chart should be a JSON with the sourcebook option holding the chart.
   * This will select the source and then roll against the found chart. If
   * no chart is found for the string provided, then it will default to
   * "CP2020"
   * @param {*} chart - Chart to roll against.
   * @param {*} source - the sourcebook to find in the chart.
   * @returns - string of the roll option from the chart.
   * @memberof DiceService
   */
  rollOnChart(chart, source) {
    if ((typeof (chart[source]) === 'undefined') && source.indexOf('-') > -1) {
      const v: string[] = source.split('-');
      if (v.length > 2) {
        source = (typeof (chart[v[1]]) === 'undefined') ? v[0] : v[1];
      } else {
        source = v[0];
      }
    }
    if (typeof (chart[source]) === 'undefined') {
        source = 'CP2020';
    }
    const c = chart[source];
    return this.processResult(c[this.generateNumber(0, c.length - 1)]);
  }
}
