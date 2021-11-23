import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { GroupCardDetail } from '@types';
import GroupDetailHeader from './GroupDetailHeader';
import GroupDetailStatus from './GroupDetailStatus';
import GroupDetailTitle from './GroupDetailTitle';
import GroupDetailFooter from './GroupDetailFooter';
import { calculateRemainTimeFromNow } from '@utils/Date';
import { groupHttpClient } from '@api';

interface Props {
  contents: GroupCardDetail;
}

interface GroupEnrollment {
  type?: string;
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
      case 'OWNER':
        return `그룹장인 그룹입니다.`;
      case 'MENTOR':
        return `멘토인 그룹입니다.`;
      case 'MENTEE':
        return `멘티인 그룹입니다.`;
      default:
        return '';
    }
  };

  useEffect(() => {
    const test = async () => {
      try {
        const groupRole: GroupEnrollment = await groupHttpClient.getGroupRole(id);
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
