import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cs-temp-generator-gear',
  templateUrl: './temp-generator-gear.component.html',
  styleUrls: ['./temp-generator-gear.component.css']
})
export class TempGeneratorGearComponent implements OnInit {

  @Input()
  gear: string[];

  @Input()
  cyberware: string[];

  constructor() { }

  ngOnInit() {
  }

  getY(index: number): number {
    let y = 0;
    y = ((index + 1) * 60) + 20;
    return y;
  }

}
