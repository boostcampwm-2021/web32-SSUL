import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import DatePicker from 'antd/es/date-picker';
import { RangeValue } from 'rc-picker/lib/interface';
import 'antd/es/date-picker/style/css';

interface Props {
  startAt: string;
  endAt: string;
  setDate: (startAt: string, endAt: string) => void;
}

function AntDatePicker({ startAt, endAt, setDate }: Props): JSX.Element {
  const checkDate = (current: moment.Moment) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const date = `${now.getDate()}`.padStart(2, '0');
    const start = moment(`${year}-${month}-${date}`, 'YYYY-MM-DD');
    return current < start;
  };
  const handleCalendarChange = (
    values: RangeValue<moment.Moment>,
    formatString: [string, string],
  ) => {
    const [newStartDate, newEndDate] = formatString;
    setDate(newStartDate, newEndDate);
  };
  return (
    <CustomPicker
      format={'YYYY-MM-DD'}
      size="large"
      disabledDate={checkDate}
      onChange={handleCalendarChange}
      defaultValue={[startAt !== '' ? moment(startAt) : null, endAt !== '' ? moment(endAt) : null]}
      style={{
        width: '100%',
        textAlign: 'center',
      }}
    />
  );
}

const CustomPicker = styled(DatePicker.RangePicker)`
  &.ant-picker-focused {
    border-color: #00c5aa;
  }
  &.ant-picker-range .ant-picker-active-bar {
    background: #00c5aa;
  }
  &:hover {
    border-color: #00c5aa;
  }
`;

export default AntDatePicker;
