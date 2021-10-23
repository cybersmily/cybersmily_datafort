import { Cp2020SDP } from './cp2020-sdp';
export class Cp2020SDPBlock {
  head: Cp2020SDP;
  torso: Cp2020SDP;
  rarm: Cp2020SDP;
  larm: Cp2020SDP;
  rleg: Cp2020SDP;
  lleg: Cp2020SDP;

  constructor(param?:Cp2020SDPBlock){
    if(param)  {
      this.head = param.head;
      this.torso = param.torso;
      this.rarm = param.rarm;
      this.larm = param.larm;
      this.rleg = param.rleg;
      this.lleg = param.lleg;
    } else {
      this.head = {curr: 0, damaged: 0, destroyed: 0};
      this.torso = {curr: 0, damaged: 0, destroyed: 0};
      this.rarm = {curr: 0, damaged: 0, destroyed: 0};
      this.larm = {curr: 0, damaged: 0, destroyed: 0};
      this.rleg = {curr: 0, damaged: 0, destroyed: 0};
      this.lleg = {curr: 0, damaged: 0, destroyed: 0};
    }

  }
}
