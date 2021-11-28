export const getPostTypeString = (type: string): string => {
  switch (type) {
    case 'NORMAL':
      return '일반';
    case 'NOTICE':
      return '공지';
  }
  return '일반';
};
