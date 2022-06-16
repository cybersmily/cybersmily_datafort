import { CpRedStat } from '../models/cp-red-stat';

export const CalculateCpRedStatModified = (stat: CpRedStat): number => {
  let result: number =
    stat.modifiers?.reduce((a, b) => a + (b.active ? b.value : 0), 0) ?? 0;
  result += Number(stat.base);
  return result ?? 0;
};
