import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks';
import { changeGroupModalState } from '@store/util/Slice';
import { groupHttpClient } from '@api';
import { selectUser } from '@store/user/globalSlice';

interface Props {
  groupId: number;
  remainDate: number | null;
}

function GroupDetailFooter({ groupId, remainDate }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector(selectUser);

  const handleApplyButtonClick = async () => {
    groupHttpClient.postApplyGroup({ groupId, userId });
    dispatch(changeGroupModalState('NONE'));
  };

  return (
    <Container>
      <RemainDays>D-{remainDate}</RemainDays>
      {userId !== 0 && (
        <GroupApplyButton onClick={handleApplyButtonClick}>신청하기</GroupApplyButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const GroupApplyButton = styled.button`
  display: flex;
  padding: 10px;
  margin-left: auto;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  flex-direction: row;
`;

const RemainDays = styled.h3`
  margin: 10px 0;
  color: ${(props) => props.theme.Gray4};
`;

export default GroupDetailFooter;
