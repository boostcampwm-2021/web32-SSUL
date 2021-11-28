const MAX_NAME_LENGTH = 10;

export const getFixedLengthName = (name: string): string =>
  name.length > MAX_NAME_LENGTH ? `"${name.slice(0, MAX_NAME_LENGTH)}..."` : `"${name}"`;

export const resultText = (name: string, message: string): string =>
  `${getFixedLengthName(name)} \n${message}`;

export const applyText = (name: string, message: string): string => `"${name}" 님이\n${message}`;
