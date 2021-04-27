import { NetArchProgram } from './net-arch-program';
export interface NetArchNode {
  type: string;
  name: string;
  desc: string;
  level: number;
  cost: number;
  dv: number;
  bgColor: string;
  color: string;
  branch: Array<NetArchNode>;
  programs?:Array<NetArchProgram>;
}
