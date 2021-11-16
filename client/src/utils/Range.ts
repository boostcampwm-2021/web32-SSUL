export const rangeArray: any = (numCnt: number, start = 1) => {
  return [...Array.from(Array(numCnt).keys())].map((idx) => idx + start);
};
