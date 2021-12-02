/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector, useToast } from '@hooks';
import { changeGroupModalState } from '@store/util/Slice';
import { groupHttpClient } from '@api';
import { selectUser } from '@store/user/globalSlice';
import { GroupEnrollmentState, ModalTypeEnum } from '@constants/enums';
import {
  APPLY_TEXT,
  MSG_GROUP_APPLY_SUCCESS,
  MSG_IS_GROUP_MENTEE,
  MSG_IS_GROUP_MENTOR,
  MSG_IS_GROUP_OWNER,
} from '@constants/consts';
import { GroupRoleResponse } from '@types';

interface Props {
  groupId: number;
  remainDate: number | null;
}

function GroupDetailFooter({ groupId, remainDate }: Props): JSX.Element {
  const [notification, setNotification] = useState<string>('');
  const [isLoadding, setIsLoadding] = useState<boolean>(true);
  const [toastify] = useToast();
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector(selectUser);

  const notificationMessage = (type: string) => {
    switch (type) {
      case GroupEnrollmentState.OWNER:
        return MSG_IS_GROUP_OWNER;
      case GroupEnrollmentState.MENTOR:
        return MSG_IS_GROUP_MENTOR;
      case GroupEnrollmentState.MENTEE:
        return MSG_IS_GROUP_MENTEE;
      default:
        return '';
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const groupRole: GroupRoleResponse = await groupHttpClient.getGroupRole(groupId);
        setIsLoadding(false);
        setNotification(notificationMessage(String(groupRole.type)));
      } catch (e: any) {
        setNotification(e.description);
      }
    })();
  }, []);

  const handleApplyButtonClick = async () => {
    await groupHttpClient.postApplyGroup({ groupId, userId });
    toastify(MSG_GROUP_APPLY_SUCCESS, 'SUCCESS');
    dispatch(changeGroupModalState(ModalTypeEnum.NONE));
  };

  return (
    <Container>
      <RemainDays>D-{remainDate}</RemainDays>
      <Notification>{notification}</Notification>
      {!notification && !isLoadding && (
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
