/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { GroupCardDetail, GroupRoleResponse } from '@types';
import GroupDetailHeader from './GroupDetailHeader';
import GroupDetailStatus from './GroupDetailStatus';
import GroupDetailTitle from './GroupDetailTitle';
import GroupDetailFooter from './GroupDetailFooter';
import { calculateRemainTimeFromNow } from '@utils/Date';
import { groupHttpClient } from '@api';
import { GroupEnrollmentState } from '@constants/enums';
import { MSG_IS_GROUP_MENTEE, MSG_IS_GROUP_MENTOR, MSG_IS_GROUP_OWNER } from '@constants/consts';

interface Props {
  contents: GroupCardDetail;
}

function GroupModal({ contents }: Props): JSX.Element {
  const [notification, setNotification] = useState<string>('');

  const {
    id,
    name,
    curUserCnt,
    maxUserCnt,
    category,
    ownerInfo,
    techStacks,
    intro,
    endAt,
    startAt,
  } = contents;

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
    const test = async () => {
      try {
        const groupRole: GroupRoleResponse = await groupHttpClient.getGroupRole(id);
        setNotification(notificationMessage(String(groupRole.type)));
      } catch (e: any) {
        setNotification(e.description);
      }
    };
    test();
  }, []);

  return (
    <Container>
      <GroupDetailTitle {...{ category }} />
      <GroupDetailHeader {...{ name, curUserCnt, maxUserCnt }} />
      <GroupDetailStatus
        {...{
          techStacks,
          ownerInfo,
          intro,
          endAt,
          startAt,
        }}
      />
      <GroupDetailFooter
        notfication={notification}
        groupId={id}
        remainDate={calculateRemainTimeFromNow(startAt)}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export default GroupModal;
