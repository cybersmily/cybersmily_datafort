import { CpRedWoundsManagerService } from './../../cp-red-wounds/services/cp-red-wounds-manager/cp-red-wounds-manager.service';
import { CpRedSkillManagerService } from './../../cp-red-skills/services/cp-red-skill-manager/cp-red-skill-manager.service';
import { CpRedStatsManagerService } from './../../c-p-red-stats/services/cp-red-stats-manager/cp-red-stats-manager.service';
import { CpRedCharacterPenaltyModifier } from './../../models/cp-red-character-penalty-modifier';
import { Injectable } from '@angular/core';
import { CP_RED_PENATLY_TYPE } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CpRedPenaltyManagerService {
  constructor(
    private statManager: CpRedStatsManagerService,
    private skillManager: CpRedSkillManagerService,
    private woundManager: CpRedWoundsManagerService
  ) {}

  applyPenatly(penalty: CpRedCharacterPenaltyModifier): void {
    switch (penalty.type) {
      case CP_RED_PENATLY_TYPE.SKILL:
        break;
      case CP_RED_PENATLY_TYPE.STAT:
        break;
      case CP_RED_PENATLY_TYPE.DEATH_SAVE:
        break;
      case CP_RED_PENATLY_TYPE.ALL_ACTIONS:
        break;
      default:
      // for CP_RED_PENATLY_TYPE.OTHER
    }
  }

  removePenalty(penalty: CpRedCharacterPenaltyModifier): void {
    switch (penalty.type) {
      case CP_RED_PENATLY_TYPE.SKILL:
        break;
      case CP_RED_PENATLY_TYPE.STAT:
        break;
      case CP_RED_PENATLY_TYPE.DEATH_SAVE:
        break;
      case CP_RED_PENATLY_TYPE.ALL_ACTIONS:
        break;
      default:
      // for CP_RED_PENATLY_TYPE.OTHER
    }
  }
}
