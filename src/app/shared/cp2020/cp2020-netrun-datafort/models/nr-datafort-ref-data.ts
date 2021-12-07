import { NrDatafortRefDataVr } from './nr-datafort-ref-data-vr';
import { Coord } from "./../../../models/coord";
import { NrDatafortRefDataEntry } from "./nr-datafort-ref-data-entry";
import { NrDatafortRefDataRemote } from './nr-datafort-ref-data-remote';
import { NrDatafortRefDataProgram } from './nr-datafort-ref-data-program';

export interface NrDatafortRefData {
    skills: Array<string>;
    ai: {
      personalities: Array<NrDatafortRefDataEntry>;
      reactions: Array<NrDatafortRefDataEntry>;
      icons:  Array<NrDatafortRefDataEntry>;
    },
    filesTypes: Array<NrDatafortRefDataEntry>;
    virtuals: Array<NrDatafortRefDataVr>;
    virtualRealism: Array<NrDatafortRefDataEntry>;
    programsTypes: Array<NrDatafortRefDataProgram>;
    programs: {
      detection_alarm: Array<NrDatafortRefDataEntry>;
      anti_ic: Array<NrDatafortRefDataEntry>;
      anti_system: Array<NrDatafortRefDataEntry>;
      anti_personnel: Array<NrDatafortRefDataEntry>;
    },
    remotes: Array<NrDatafortRefDataRemote>;
    layouts: Array<Array<Coord>>;
    codegateLayout: Array<Array<Coord>>;
    defenseLayout: Array<Array<Coord>>;
}
