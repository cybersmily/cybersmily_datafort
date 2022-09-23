import { CpRedCharacterStatSettings } from './cp-red-character-stat-settings';
import { CpRedCharacterSettings } from './cp-red-character-settings';

export class CpRedPlayerCharacterSettings implements CpRedCharacterSettings {
  statSettings: CpRedCharacterStatSettings;

  constructor(param?: any) {
    this.statSettings = new CpRedCharacterStatSettings(param?.statSettings);
  }
}
