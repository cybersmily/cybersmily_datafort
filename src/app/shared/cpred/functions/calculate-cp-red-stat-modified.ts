import { CpRedStat } from '../models/cp-red-stat';

export const CalculateCpRedStatModified = (stat: CpRedStat): number => {
  return (
    stat?.modifiers?.reduce((a, b) => a + (b.active ? b.value : 0), 0) ?? 0
  );
};
