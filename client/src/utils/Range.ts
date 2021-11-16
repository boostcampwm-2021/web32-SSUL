export const rangeArray = (numCnt: number, start = 1): number[] => {
  return [...Array.from(Array(numCnt).keys())].map((idx) => idx + start);
};
