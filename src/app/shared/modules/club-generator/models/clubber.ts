import { Cp2020PlayerSkill } from '../../../cp2020/cp2020-skills/models';

export interface Clubber {
  ages: number;
  styles: string;
  stats: {
    int: number;
    attr: number;
    emp: number;
    ref: number;
    cool: number;
    body: number;
    ma: number;
    tech: number;
    luck: number;
  };
  skills: Array<Cp2020PlayerSkill>;
  haircolor: string;
  hairstyle: string;
  cyberware: Array<string>;
}
