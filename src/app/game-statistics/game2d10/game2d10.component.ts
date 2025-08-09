import { DiceService } from './../../shared/services/dice/dice.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cs-game2d10',
    templateUrl: './game2d10.component.html',
    styleUrls: ['./game2d10.component.css'],
    standalone: false
})
export class Game2d10Component implements OnInit {

  constructor(private dice: DiceService) { }

  rolls: Array<number> = new Array<number>(10);
  sample: number = 10000;
  doubles: Array<number> = new Array<number>(10);
  triplets: Array<number> = new Array<number>(10);
  quaduplets: Array<number> = new Array<number>(10);
  diceUsed: number = 1;
  diceType: number = 10;

  ngOnInit(): void {
    this.update();
  }

  update() {
    let arryLength = this.diceUsed * this.diceType;
    this.rolls = new Array<number>(arryLength);
    this.rolls.fill(0);
    this.doubles = new Array<number>(arryLength);
    this.doubles.fill(0);
    this.triplets = new Array<number>(arryLength);
    this.triplets.fill(0);
    this.quaduplets = new Array<number>(arryLength);
    this.quaduplets.fill(0);

    for( let i = 0; i < this.sample; i++){
      const diceRolled = this.dice.rollDice(`${this.diceUsed}d${this.diceType}`);

      this.rolls[diceRolled.total - 1] += 1;
      if(diceRolled.rolls.length > 1) {
        if(diceRolled.rolls[0] === diceRolled.rolls[1]) {
          this.doubles[diceRolled.total - 1] += 1;
        }
      }

    }
  }



  get totalRolls(): number  {
    return this.rolls.reduce((a,b) => a + b, 0);
  }

}
