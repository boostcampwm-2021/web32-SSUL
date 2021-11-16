import moment from 'moment';

const DAYS_OF_WEEK = 7;
const DAYS_OF_MONTH = 31;
const DAYS_OF_YEAR = 365;

export const formatDateToString = (date: Date | null): string => {
  return moment(date).format('YYYY-MM-DD');
};

export const calculateRemainTimeFromNow = (date: Date | null): number => {
  const groupStartTime = moment(formatDateToString(date));
  const today = moment();
  return groupStartTime.diff(today, 'days');
};
