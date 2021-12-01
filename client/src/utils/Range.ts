import { GAUGE_BAR_DEFAULT_INDEX } from '@constants/consts';

export const makeRangeNumberArray = (numCnt: number, start = 1): number[] => {
  return [...Array.from(Array(numCnt).keys())].map((idx) => idx + start);
};

export const getStackGage = (number: number): number => {
  if (number < GAUGE_BAR_DEFAULT_INDEX) return GAUGE_BAR_DEFAULT_INDEX;
  else return number + GAUGE_BAR_DEFAULT_INDEX;
};
