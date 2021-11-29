import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks';
import { changeGroupModalState } from '@store/util/Slice';
import { groupHttpClient } from '@api';
import { selectUser } from '@store/user/globalSlice';
import { ModalTypeEnum } from '@constants/enums';
import { APPLY_TEXT } from '@constants/consts';

interface Props {
  notfication: string;
  groupId: number;
  remainDate: number | null;
}

function GroupDetailFooter({ notfication, groupId, remainDate }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector(selectUser);

  const handleApplyButtonClick = async () => {
    groupHttpClient.postApplyGroup({ groupId, userId });
    dispatch(changeGroupModalState(ModalTypeEnum.NONE));
  };

  return (
    <Container>
      <RemainDays>D-{remainDate}</RemainDays>
      <Notification>{notfication}</Notification>
      {!userId && !notfication && (
        <GroupApplyButton onClick={handleApplyButtonClick}>{APPLY_TEXT}</GroupApplyButton>
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

const Notification = styled.h4`
  margin: 10px 0;
  color: ${(props) => props.theme.Red};
`;

export default GroupDetailFooter;
