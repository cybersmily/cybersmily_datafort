import { Observable } from 'rxjs';
import { CpRedSkillManagerService } from './../../services/cp-red-skill-manager/cp-red-skill-manager.service';
import { Component, OnInit } from '@angular/core';
import { CpRedCharacterSkill } from '../../models';

@Component({
  selector: 'cs-cp-red-skills',
  templateUrl: './cp-red-skills.component.html',
  styleUrls: ['./cp-red-skills.component.css'],
})
export class CpRedSkillsComponent implements OnInit {
  skills$: Observable<Array<CpRedCharacterSkill>>;

  sortOn: string = 'name';
  sortDirection: boolean = false;

  constructor(private skillManager: CpRedSkillManagerService) {}

  ngOnInit(): void {
    this.skills$ = this.skillManager.skills;
  }
}
