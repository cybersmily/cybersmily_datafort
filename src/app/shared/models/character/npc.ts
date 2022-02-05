import { Background } from './background';
import { Career } from './career';
import { iNpc } from './inpc';
import { NpcSkill, Skill, SkillBlock } from '../../cp2020/cp2020-skills/models';
import { Stats } from './stats';

import { PEEPS_IMG_PATH } from './../constants';

export class Npc implements iNpc {
  name: string;
  handle: string;
  aliases: string;
  age: number;
  img: string;
  career: Career;
  stats: Stats;
  skills: SkillBlock | string[] | Skill[] | NpcSkill[];
  background: Background;
  cyberware: string[];
  gear: string[];
  history: string;
  playerinfo?: string;

  constructor(npcProfile?: iNpc) {
    if (npcProfile) {
      this.name = npcProfile.name || '';
      this.handle = npcProfile.handle || '';
      this.aliases = npcProfile.aliases || '';
      this.age = npcProfile.age || 0;
      this.img = npcProfile.img || '';
      this.career = npcProfile.career || {
        name: '',
        specialability: '',
        value: 0
      };
      this.stats = npcProfile.stats || {
        int: 0,
        ref: 0,
        tech: 0,
        cool: 0,
        attr: 0,
        luck: 0,
        ma: 0,
        body: 0,
        emp: 0,
        hc: 0,
        rep: 0
      };
      this.skills = npcProfile.skills || [];
      this.background = npcProfile.background || {
        motivations: { traits: '', valuedperson: '', valuemost: '', feelaboutpeople: '', valuedpossession: '' },
        style: { clothes: '', hair: '', affectations: '', ethnicity: '', languages: '' }
      };
      this.cyberware = npcProfile.cyberware || [];
      this.gear = npcProfile.gear || [];
      this.history = npcProfile.history || '';
      this.playerinfo = npcProfile.playerinfo || '';
    } else {
      this.name = '';
      this.handle = '';
      this.aliases = '';
      this.age = 0;
      this.img = '';
      this.career = {
        name: '',
        specialability: '',
        value: 0
      };
      this.stats = {
        int: 0,
        ref: 0,
        tech: 0,
        cool: 0,
        attr: 0,
        luck: 0,
        ma: 0,
        body: 0,
        emp: 0,
        hc: 0,
        rep: 0
      };
      this.skills = [];
      this.background = {
        motivations: { traits: '', valuedperson: '', valuemost: '', feelaboutpeople: '', valuedpossession: '' },
        style: { clothes: '', hair: '', affectations: '', ethnicity: '', languages: '' }
      };
      this.cyberware = [];
      this.gear = [];
      this.history = '';
      this.playerinfo = '';
    }
  }

  get imgFile(): string {
    return `${PEEPS_IMG_PATH}${this.img}.png`;
  }
}

