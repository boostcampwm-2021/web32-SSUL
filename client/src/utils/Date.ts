import moment from 'moment';

type UtilDate = Date | string | null;

const DAYS_OF_WEEK = 7;
const DAYS_OF_MONTH = 31;
const DAYS_OF_YEAR = 365;

export const formatDateToString = (date: UtilDate): string => {
  return moment(date).format('YYYY-MM-DD');
};

export const calculateRemainTimeFromNow = (date: Date | null): number => {
  const groupStartTime = moment(new Date(formatDateToString(date)));
  const today = moment();
  return groupStartTime.diff(today, 'days');
};

export const classifyDate = (startDate: Date | null, endDate: Date | null): string => {
  if (calculateRemainTimeFromNow(startDate) > 0) return '진행전';
  else if (calculateRemainTimeFromNow(startDate) < 0 && calculateRemainTimeFromNow(endDate) > 0)
    return '진행중';
  else return '종료';
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
