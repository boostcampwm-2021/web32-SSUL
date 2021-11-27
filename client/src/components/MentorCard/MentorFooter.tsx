import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks';
import { changeGroupModalState } from '@store/util/Slice';
import { selectUser } from '@store/user/globalSlice';
import { setMentorCardDetail } from '@store/mentor/cardDetailSlice';

interface Props {
  mentorId: number;
}

function MentorFooter({ mentorId }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(selectUser);

  const handleShowDetailButtonClick = () => {
    dispatch(setMentorCardDetail(mentorId));
    dispatch(changeGroupModalState('MENTOR_DETAIL'));
  };
  return (
    <Container>
      {id !== 0 && id !== mentorId && (
        <ApplyButton onClick={handleShowDetailButtonClick}>멘토링 신청</ApplyButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const ApplyButton = styled.button`
  display: flex;
  padding: 10px;
  margin-left: auto;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
`;

export default MentorFooter;
