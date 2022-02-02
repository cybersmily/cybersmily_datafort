import { DiceService } from './../../shared/services/dice/dice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-game2d10',
  templateUrl: './game2d10.component.html',
  styleUrls: ['./game2d10.component.css']
})
export class Game2d10Component implements OnInit {

  constructor(private dice: DiceService) { }

  rolls: Array<number> = new Array<number>(19);
  sample: number = 10000;
  doubles: Array<number> = new Array<number>(19);

  ngOnInit(): void {
    this.update();
  }

  update() {
    this.rolls = new Array<number>(19);
    this.rolls.fill(0);
    this.doubles = new Array<number>(19);
    this.doubles.fill(0);
    for( let i = 0; i < this.sample; i++){
      const num1 = this.dice.generateNumber(1,10);
      const num2 = this.dice.generateNumber(1,10);
      const sum = num1 + num2;
      this.rolls[sum-2] += 1;
      if(num1 === num2) {
        this.doubles[sum-2] += 1;
      }
    }
  }

  get totalRolls(): number  {
    return this.rolls.reduce((a,b) => a + b, 0);
  }

}
