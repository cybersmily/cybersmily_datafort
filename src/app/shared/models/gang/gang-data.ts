export interface GangData {
    name: string;
    description: string;
    leader: string;
    notableMembers: string;
    members: string;
    turf: string;
    rivals: string;
    allies: string;
    tag: { img: string, desc: string};
    colors: string;
    weapon: string;
    threatLevel: string;
    threatCode: string;
    averageMemerb: {
      stats: {
        INT: number;
        REF: number;
        TECH: number;
        COOL: number;
        ATT: number;
        MA: number;
        BOD: number;
        LUCK: number;
        EMP: number;
      },
      skills: Array<string>;
      cyber: Array<string>;
    }
}
