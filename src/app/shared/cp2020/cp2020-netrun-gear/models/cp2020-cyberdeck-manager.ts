import { Cp2020ProgramList } from './cp2020-program-list';
import { Cp2020Cyberdeck } from './cp2020-cyberdeck';
import { CyberdeckManager } from './cyberdeck-manager';

export class Cp2020CyberdeckManager implements CyberdeckManager {
  deck: Cp2020Cyberdeck = new Cp2020Cyberdeck();
  programList: Cp2020ProgramList = new Cp2020ProgramList();

  constructor(param?: CyberdeckManager) {
    if (param) {
      this.deck = new Cp2020Cyberdeck(param.deck);
      this.programList = new Cp2020ProgramList(param.programList);
    } else {
      this.programList = new Cp2020ProgramList();
      this.deck = new Cp2020Cyberdeck();
    }
  }
}
