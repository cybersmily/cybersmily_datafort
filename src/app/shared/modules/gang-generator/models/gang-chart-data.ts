import { ValueWeight } from './../../../models/ValueWeight';
export interface GangChartData {
  type: Array<ValueWeight<string>>;
  age: Array<ValueWeight<string>>;
  memberAge: Array<ValueWeight<string>>;
  member: Array<ValueWeight<string>>;
  turf: Array<ValueWeight<string>>;
  expansion: Array<ValueWeight<string>>;
}
