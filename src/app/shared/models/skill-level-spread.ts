import { DiceService } from './../services/dice/dice.service';
export class SkillLevelSpread {
  constructor(private diceService: DiceService) {}

  get normal(): number {
    const die = this.diceService.generateNumber(1, 31);
    switch (die) {
      case 1:
      case 2:
      case 3:
        return 1;
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return 2;
      case 9:
      case 10:
      case 11:
      case 12:
        return 3;
      case 13:
      case 14:
      case 15:
      case 16:
        return 4;
      case 17:
      case 18:
      case 19:
      case 20:
        return 5;
      case 21:
      case 22:
      case 23:
        return 6;
      case 24:
      case 25:
      case 26:
        return 7;
      case 27:
      case 28:
        return 8;
      case 29:
      case 30:
        return 9;
      default:
        return 10;
    }
  }

  get lowlevel(): number {
    const die = this.diceService.generateNumber(1, 31);
    switch (die) {
      case 1:
      case 2:
      case 3:
      case 4:
        return 1;
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        return 2;
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        return 3;
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
        return 4;
      case 20:
      case 21:
      case 22:
        return 5;
      case 23:
      case 24:
      case 25:
        return 6;
      case 26:
      case 27:
        return 7;
      case 28:
      case 29:
        return 8;
      case 30:
        return 9;
      default:
        return 10;
    }
  }

  get highlevel(): number {
    const die = this.diceService.generateNumber(1, 33);
    switch (die) {
      case 1:
      case 2:
        return 1;
      case 3:
      case 4:
      case 5:
        return 2;
      case 6:
      case 7:
      case 8:
        return 3;
      case 9:
      case 10:
      case 11:
      case 12:
        return 4;
      case 13:
      case 14:
      case 15:
      case 16:
        return 5;
      case 17:
      case 18:
      case 19:
      case 20:
        return 6;
      case 21:
      case 22:
      case 23:
      case 24:
        return 7;
      case 25:
      case 26:
      case 27:
        return 8;
      case 28:
      case 29:
      case 30:
        return 9;
      default:
        return 10;
    }
  }
}
