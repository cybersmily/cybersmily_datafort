import { Cp2020StatBlock } from './../../shared/cp2020/cp2020-stats/models/cp2020-stat-block';
import { Cp2020PlayerSkills } from './../../shared/cp2020/cp2020-skills/models/cp2020-player-skills';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-beta-view-main',
  templateUrl: './beta-view-main.component.html',
  styleUrls: ['./beta-view-main.component.css']
})
export class BetaViewMainComponent implements OnInit {

  skills: Cp2020PlayerSkills = new Cp2020PlayerSkills();
  stats: Cp2020StatBlock = new Cp2020StatBlock();

  constructor() { }

  ngOnInit(): void {
  }

}
