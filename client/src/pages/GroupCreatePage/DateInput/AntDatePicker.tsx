import React from 'react';
import moment from 'moment';
import DatePicker from 'antd/es/date-picker';
import styled from '@emotion/styled';
import { RangeValue } from 'rc-picker/lib/interface';
const { RangePicker } = DatePicker;
import 'antd/es/date-picker/style/css';
import { groupCreateDataState, setGroupData } from '@store/group/makerSlice';
import { useAppDispatch, useAppSelector } from '@hooks';

function AntDatePicker(): JSX.Element {
  const { startAt, endAt } = useAppSelector(groupCreateDataState);
  const dispatch = useAppDispatch();

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
    dispatch(setGroupData({ startAt: newStartDate, endAt: newEndDate }));
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

const CustomPicker = styled(RangePicker)`
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
