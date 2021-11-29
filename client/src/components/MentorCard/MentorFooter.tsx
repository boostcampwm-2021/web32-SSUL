import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks';
import { changeGroupModalState } from '@store/util/Slice';
import { selectUser } from '@store/user/globalSlice';
import { setMentorCardDetail } from '@store/mentor/cardDetailSlice';
import { ModalTypeEnum } from '@constants/enums';
import { MENTOR_APPLY_TEXT } from '@constants/consts';

interface Props {
  mentorId: number;
}

function MentorFooter({ mentorId }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(selectUser);

  const handleShowDetailButtonClick = () => {
    dispatch(setMentorCardDetail(mentorId));
    dispatch(changeGroupModalState(ModalTypeEnum.MENTOR_DETAIL));
  };
  return (
    <Container>
      {!id && id !== mentorId && (
        <ApplyButton onClick={handleShowDetailButtonClick}>{MENTOR_APPLY_TEXT}</ApplyButton>
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
