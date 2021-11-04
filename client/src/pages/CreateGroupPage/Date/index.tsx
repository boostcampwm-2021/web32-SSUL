import styled from '@emotion/styled';
import React from 'react';
import AntDatePicker from './AntDatePicker';

function Date(): JSX.Element {
  return(
    <>
      <Title>시작일을 선택해주세요.</Title>
      <AntDatePicker/>
    </>
  )
}

const Title = styled.p`
  margin: 30px;
`;

export default Date;
