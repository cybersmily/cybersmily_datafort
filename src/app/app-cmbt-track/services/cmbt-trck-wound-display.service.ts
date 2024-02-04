import { Injectable } from '@angular/core';
import { faHeartBroken, faHeart, faHeartbeat, faFirstAid, faSkull, faTint } from '@fortawesome/free-solid-svg-icons';
import { Cp2020_WOUND_LEVELS } from '../../shared/cp2020/cp2020-stats/models/cp2020-wound-levels.enum';
import { CmbtTrckOpponent } from '../../shared/models/cmbt-trck';

@Injectable({
  providedIn: 'root'
})
export class CmbtTrckWoundDisplayService {
  faHeartBroken = faHeartBroken;
  faHeart = faHeart;
  faHeartbeat = faHeartbeat;
  faFirstAid = faFirstAid;
  faSkull = faSkull;
  faTint = faTint;

  constructor() { }


  getWoundLevel(opp: CmbtTrckOpponent): string {
    if (opp?.stats?.WoundLevel > 0) {
      return Cp2020_WOUND_LEVELS[opp.stats.WoundLevel] + ' wound';
    }
    return '';
  }

  getWoundIcon(opp: CmbtTrckOpponent): Array<any> {
    if (opp?.stats?.WoundLevel < 0) {
      return [];
    }
    const icons = [];
    if(opp.stats.deathState > 0) {
      for(let i = 0; i < opp.stats.deathState; i++) {
        icons.push(this.faSkull);
      }
      return icons;
    }
    switch (opp.stats.WoundLevel) {
      case Cp2020_WOUND_LEVELS.MORTAL_6:
        icons.unshift(this.faHeartbeat);
      case Cp2020_WOUND_LEVELS.MORTAL_5:
        icons.unshift(this.faHeartbeat);
      case Cp2020_WOUND_LEVELS.MORTAL_4:
        icons.unshift(this.faHeartbeat);
      case Cp2020_WOUND_LEVELS.MORTAL_3:
        icons.unshift(this.faHeartbeat);
      case Cp2020_WOUND_LEVELS.MORTAL_2:
        icons.unshift(this.faHeartbeat);
      case Cp2020_WOUND_LEVELS.MORTAL_1:
        icons.unshift(this.faHeartbeat);
      case Cp2020_WOUND_LEVELS.MORTAL_0:
        icons.unshift(this.faHeartbeat);
      case Cp2020_WOUND_LEVELS.CRITICAL:
        icons.unshift(this.faHeartBroken);
      case Cp2020_WOUND_LEVELS.SERIOUS:
        icons.unshift(this.faHeart);
      case Cp2020_WOUND_LEVELS.LIGHT:
        icons.unshift(this.faTint);
    }
    return icons;
  }

}
