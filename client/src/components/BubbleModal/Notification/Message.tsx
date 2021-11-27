import React from 'react';
import styled from '@emotion/styled';
import { NotificationData } from '@types';

interface Props {
  data: NotificationData;
}

const MAX_NAME_LENGTH = 10;

function Message({ data }: Props): JSX.Element {
  const getText = () => {
    switch (data.type) {
      case 'JOIN_GROUP_ACCEPTED':
        return resultText(data.groupName, '그룹참여가', '승인');
      case 'JOIN_GROUP_DECLINED':
        return resultText(data.groupName, '그룹참여가', '거절');
      case 'MENTORING_ACCEPTED':
        return resultText(data.groupName, '멘토요청이', '수락');
      case 'METTORING_DECLIEND':
        return resultText(data.groupName, '멘토요청이', '거절');
      case 'JOIN_GROUP_REQUEST':
        return applyText(data.senderName, '그룹참가 요청을');
      case 'MENTORING_REQUEST':
        return applyText(data.senderName, '그룹 멘토 요청을');
    }
  };

  const getFixedLengthName = (name: string) =>
    name.length > MAX_NAME_LENGTH ? `"${name.slice(0, MAX_NAME_LENGTH)}..."` : `"${name}"`;

  const resultText = (name: string, what: string, result: string) =>
    `${getFixedLengthName(name)} \n${what} ${result} 되었습니다.`;

  const applyText = (name: string, what: string) => `"${name}" 님이\n${what} 보냈습니다.`;

  return <Container>{getText()}</Container>;
}

const Container = styled.span`
  width: 150px;
  font-weight: 600;
  white-space: pre;
`;

export default Message;
