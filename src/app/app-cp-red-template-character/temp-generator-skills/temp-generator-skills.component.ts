import { Component, OnInit, Input } from '@angular/core';
import { CpRedTemplateSkill } from './../../shared/cpred/models/cp-red-template-skill';

@Component({
  selector: 'cs-temp-generator-skills',
  templateUrl: './temp-generator-skills.component.html',
  styleUrls: ['./temp-generator-skills.component.css']
})
export class TempGeneratorSkillsComponent implements OnInit {
  @Input()
  skills: CpRedTemplateSkill[];

  constructor() { }

  ngOnInit() {
  }

  getX(index: number) {
    let x = 110;
    const mod = index % 3;
    x += mod * 120;
    return x;
  }

  getY(index: number) {
    let y = 20;
    const mod = Math.floor(index / 3);
    y += mod * 70;
    return y;
  }

}
