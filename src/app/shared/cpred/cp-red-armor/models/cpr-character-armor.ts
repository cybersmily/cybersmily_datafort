import { CprCharacterArmorSection } from './cpr-character-armor-section';
import { CprArmor } from './cpr-armor';
export class CprCharacterArmor implements CprArmor {
  head: CprCharacterArmorSection;
  body: CprCharacterArmorSection;
  shield: CprCharacterArmorSection;

  constructor(param?: any) {
    this.head = new CprCharacterArmorSection(param?.head);
    this.head.name = 'head';
    this.body = new CprCharacterArmorSection(param?.body);
    this.body.name = 'body';
    this.shield = new CprCharacterArmorSection(param?.shield);
    this.shield.name = 'shield';
  }
}
