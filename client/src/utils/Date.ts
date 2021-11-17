import moment from 'moment';

const DAYS_OF_WEEK = 7;
const DAYS_OF_MONTH = 31;
const DAYS_OF_YEAR = 365;

export const formatDateToString = (date: Date | null | string): string => {
  return moment(date).format('YYYY-MM-DD');
};

export const calculateRemainTimeFromNow = (date: Date | null): number => {
  const groupStartTime = moment(formatDateToString(date));
  const today = moment();
  return groupStartTime.diff(today, 'days');
};

export const calculateStudyTime = (startAt: Date | null, endAt: Date | null): string => {
  const groupStartTime = moment(formatDateToString(startAt));
  const groupEndTime = moment(formatDateToString(endAt));
  const diffDays = groupEndTime.diff(groupStartTime, 'days');
  if (diffDays < DAYS_OF_WEEK) return `${diffDays}일`;
  else if (diffDays < DAYS_OF_MONTH) return `${Math.ceil(diffDays / DAYS_OF_WEEK)}주`;
  else if (diffDays < DAYS_OF_YEAR) return `${Math.ceil(diffDays / DAYS_OF_MONTH)}개월`;
  else return `${Math.ceil(diffDays / DAYS_OF_YEAR)}년 이상`;
};
