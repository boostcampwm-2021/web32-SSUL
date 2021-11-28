export const generateString = (length: number, character: string = '#') =>
  [...Array(length)].reduce((acc) => `${acc}${character}`, '');
