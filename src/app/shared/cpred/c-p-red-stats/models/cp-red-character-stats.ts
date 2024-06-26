import { CpRedStats } from './cp-red-stats';
import { CpRedCharacterStat } from './cp-red-character-stat';

export class CpRedCharacterStats implements CpRedStats {
  int: CpRedCharacterStat;
  ref: CpRedCharacterStat;
  dex: CpRedCharacterStat;
  tech: CpRedCharacterStat;
  cool: CpRedCharacterStat;
  will: CpRedCharacterStat;
  luck: CpRedCharacterStat;
  move: CpRedCharacterStat;
  body: CpRedCharacterStat;
  emp: CpRedCharacterStat;

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
