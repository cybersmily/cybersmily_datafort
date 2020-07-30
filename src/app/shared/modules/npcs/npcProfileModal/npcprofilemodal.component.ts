import { PEEPS_IMG_PATH } from './../../../models/constants';
import { DataService } from './../../../services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Npc, NpcSkill, Skill } from '../../../models/character';
import { BsModalRef } from 'ngx-bootstrap';


@Component({
  selector: 'cs-npcprofile-modal',
  templateUrl: './npcprofilemodal.component.html',
  styleUrls: ['./npcprofilemodal.component.css']
})
export class NpcProfileModalComponent implements OnInit {
  npcFile: string;
  npcProfile: Npc;
  skillStatsList: string[] = ['attr', 'int', 'ref', 'tech', 'body', 'cool', 'emp'];
  imgFile: string;

  npcSkills: NpcSkill[];

  constructor(public bsModalRef: BsModalRef, private dataService: DataService) { }

  ngOnInit() {
    this.npcProfile = new Npc();
    this.npcSkills = new Array();
    // load NPC file
    this.loadNpc();

    }

  loadNpc() {
    if (this.npcFile) {
      this.dataService
      .GetJson(this.npcFile)
      .subscribe(
        resultObj => {
          this.npcProfile = new Npc(resultObj);
          this.loadSkills();
          this.imgFile = this.npcProfile.imgFile;
        },
        error => console.log( 'Error :: ' + error)
      );
    }

  }

  loadSkills() {
    // recreate the skill list with the stat bonuses
    if (this.npcProfile.skills instanceof Array) {
      if (typeof(this.npcProfile.skills) === 'string') {
        this.npcSkills = this.npcProfile.skills as NpcSkill[];
      } else {
        let skills: Skill[];
        skills = this.npcProfile.skills as Skill[];
        skills.forEach( element => {
            this.npcSkills.push({name: element.name, value: element.value, total: 0});
          }
        );
      }
    } else {
      this.skillStatsList.forEach(stat => {
        this.fillSkillArray(stat);
      });
    }
  }

  /**
   * fillSkillArray will fill the npcSkills with the calculated stat and skill
   * This will verify that the npcProfile skills are a SkillBlock interface.
   * @param {string} stat - Name of the stat to create skills for.
   * @memberof NpcProfileComponent
   */
  fillSkillArray(stat: string) {
    if (stat in this.npcProfile.skills ) {
        this.npcProfile.skills[stat].forEach(element => {
          const total = element.value + (this.npcProfile.stats[stat] as number);
          this.npcSkills.push({name: element.name, value: element.value, total: total});
      });
    }
  }

  adjustedEmp() {
    return Math.ceil( this.npcProfile.stats.emp - (this.npcProfile.stats.hc / 10) );
  }
}
