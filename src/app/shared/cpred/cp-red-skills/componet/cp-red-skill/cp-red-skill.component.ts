import { CpRedCharacterSkill } from './../../models/cp-red-character-skill';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cs-cp-red-skill',
  templateUrl: './cp-red-skill.component.html',
  styleUrls: ['./cp-red-skill.component.css'],
})
export class CpRedSkillComponent implements OnInit {
  @Input()
  skill: CpRedCharacterSkill = new CpRedCharacterSkill();

  constructor() {}

  ngOnInit(): void {}
}
