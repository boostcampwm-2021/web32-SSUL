import styled from '@emotion/styled';
import React from 'react';
import AntDatePicker from './AntDatePicker';

function DateInput(): JSX.Element {
  return (
    <>
      <Title>시작일, 종료일을 선택해주세요.</Title>
      <AntDatePicker />
    </>
  );
}

const Title = styled.p`
  margin: 30px;
`;

export default DateInput;
