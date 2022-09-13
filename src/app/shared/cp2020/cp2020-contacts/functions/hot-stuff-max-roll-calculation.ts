export const HotStuffMaxRollCalculation = (availablePoints: number): number => {
  if (availablePoints < 4) {
    return 0;
  } else if (availablePoints > 3 && availablePoints < 8) {
    return 1;
  } else if (availablePoints > 7 && availablePoints < 16) {
    return 2;
  } else if (availablePoints > 15 && availablePoints < 32) {
    return 3;
  } else if (availablePoints > 31 && availablePoints < 64) {
    return 4;
  }
  return 5;
};
