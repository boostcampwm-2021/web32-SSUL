import moment from 'moment';

export const formatDateToString = (date: Date | null): string => {
  return moment(date).format('YYYY-MM-DD');
};
