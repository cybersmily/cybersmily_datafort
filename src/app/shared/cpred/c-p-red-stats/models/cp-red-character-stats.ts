import { CpRedStats } from './cp-red-stats';
import { CpRedStat } from './cp-red-stat';
import { CpRedCharacterStat } from './cp-red-character-stat';

export class CpRedCharacterStats implements CpRedStats {
  int: CpRedStat;
  ref: CpRedStat;
  dex: CpRedStat;
  tech: CpRedStat;
  cool: CpRedStat;
  will: CpRedStat;
  luck: CpRedStat;
  move: CpRedStat;
  body: CpRedStat;
  emp: CpRedStat;

  constructor(stats?: CpRedStats) {
    this.int = new CpRedCharacterStat(
      stats?.int ?? {
        name: 'int',
      }
    );
    this.ref = new CpRedCharacterStat(
      stats?.ref ?? {
        name: 'ref',
      }
    );
    this.dex = new CpRedCharacterStat(
      stats?.dex ?? {
        name: 'dex',
      }
    );
    this.tech = new CpRedCharacterStat(
      stats?.tech ?? {
        name: 'tech',
      }
    );
    this.cool = new CpRedCharacterStat(
      stats?.cool ?? {
        name: 'cool',
      }
    );
    this.will = new CpRedCharacterStat(
      stats?.will ?? {
        name: 'will',
      }
    );
    this.luck = new CpRedCharacterStat(
      stats?.luck ?? {
        name: 'luck',
      }
    );
    this.move = new CpRedCharacterStat(
      stats?.move ?? {
        name: 'move',
      }
    );
    this.body = new CpRedCharacterStat(
      stats?.body ?? {
        name: 'body',
      }
    );
    this.emp = new CpRedCharacterStat(
      stats?.emp ?? {
        name: 'emp',
      }
    );
  }
}
