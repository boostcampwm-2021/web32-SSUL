import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks';
import { groupCreateDataState, setGroupData } from '@store/group/makerSlice';
import AntDatePicker from './AntDatePicker';

function DateInput(): JSX.Element {
  const { startAt, endAt } = useAppSelector(groupCreateDataState);
  const dispatch = useAppDispatch();
  const setDate = (startAt: string, endAt: string) => {
    dispatch(setGroupData({ startAt, endAt }));
  };

  return (
    <>
      <Title>시작일, 종료일을 선택해주세요.</Title>
      <AntDatePicker startAt={startAt} endAt={endAt} setDate={setDate} />
    </>
  );
}

const Title = styled.p`
  margin: 30px;
`;

export default DateInput;
