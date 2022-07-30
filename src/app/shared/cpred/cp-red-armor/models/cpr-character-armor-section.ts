import { CprArmorSection } from './cpr-armor-section';
export class CprCharacterArmorSection implements CprArmorSection {
  name: string;
  sp: {
    curr: number;
    base: number;
  };
  penalty: number;

  constructor(param?: any) {
    this.name = param?.name ?? '';
    this.sp = {
      curr: param?.sp?.curr ?? 0,
      base: param?.sp?.base ?? 0,
    };
    this.penalty = param?.penalty ?? 0;
  }
}
