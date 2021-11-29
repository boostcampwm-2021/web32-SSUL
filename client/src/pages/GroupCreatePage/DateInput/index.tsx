import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks';
import { groupCreateDataState, setGroupData } from '@store/group/makerSlice';
import { DatePicker } from '@components';
import { DATE_INTRO } from '@constants/consts';

function DateInput(): JSX.Element {
  const { startAt, endAt } = useAppSelector(groupCreateDataState);
  const dispatch = useAppDispatch();
  const setDate = (startAt: string, endAt: string) => {
    dispatch(setGroupData({ startAt, endAt }));
  };

  return (
    <>
      <Title>{DATE_INTRO}</Title>
      <DatePicker startAt={startAt} endAt={endAt} setDate={setDate} />
    </>
  );
}

const Title = styled.p`
  margin: 30px;
`;

export default DateInput;
