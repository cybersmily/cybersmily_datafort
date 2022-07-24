import { Gang } from './gang';
export class CpGang implements Gang {
  name: string;
  type: string;
  age: string;
  memberAge: string;
  member: string;
  turf: string;
  expansion: string;

  constructor() {
    this.name = '';
    this.type = '';
    this.age = '';
    this.memberAge = '';
    this.member = '';
    this.turf = '';
    this.expansion = '';
  }
}
