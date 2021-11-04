import React, { useState } from 'react';
import moment from 'moment';
import DatePicker from "antd/es/date-picker";
import styled from '@emotion/styled';
import { RangeValue } from 'rc-picker/lib/interface';
const { RangePicker } = DatePicker;
import "antd/es/date-picker/style/css";

const AntDatePicker = () => {
  const checkDate = (current: moment.Moment) =>{
    const start = moment('2021-11-04','YYYY-MM-DD');
    return  current < start;
    
  }
  const handleCalendarChange = (values: RangeValue<moment.Moment>, formatString: [string, string])=> {
    console.log(formatString);
  }
  return (
      <CustomPicker
        format={'YYYY-MM-DD'}
        size="large"
        disabledDate={checkDate}
        onChange={handleCalendarChange}
        style={{
          width: "100%",
          textAlign: "center"
        }}
      />
  );
};

const CustomPicker = styled(RangePicker)`
  &.ant-picker-focused{
    border-color: #00C5AA;
  }
  &.ant-picker-range .ant-picker-active-bar{
    background: #00C5AA;
  }
  &:hover{
    border-color: #00C5AA;
  }
`;

export default AntDatePicker;