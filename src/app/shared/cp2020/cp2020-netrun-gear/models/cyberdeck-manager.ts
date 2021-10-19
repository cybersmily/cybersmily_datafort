import { ProgramList } from './program-list';
import { Cyberdeck } from './cyberdeck';

export interface CyberdeckManager {
  deck: Cyberdeck;
  programList: ProgramList;
}
