import React from 'react';
import styled from '@emotion/styled';
import { Notification } from '@types';
import {
  NOTIFICATION_GROUP_ACCEPT,
  NOTIFICATION_GROUP_APPLY,
  NOTIFICATION_GROUP_DECLINE,
  NOTIFICATION_MENTOR_ACCEPT,
  NOTIFICATION_MENTOR_APPLY,
  NOTIFICATION_MENTOR_DECLINE,
} from '@constants/consts';
import { applyText, resultText } from '@utils/Notification';
import { NotificationTypeEnum } from '@constants/enums';

interface Props {
  data: Notification;
}

function Message({ data }: Props): JSX.Element {
  const getNotificationString = () => {
    switch (data.type) {
      case NotificationTypeEnum.JOIN_GROUP_ACCEPTED:
        return resultText(data.groupName, NOTIFICATION_GROUP_ACCEPT);
      case NotificationTypeEnum.JOIN_GROUP_DECLINED:
        return resultText(data.groupName, NOTIFICATION_GROUP_DECLINE);
      case NotificationTypeEnum.MENTORING_ACCEPTED:
        return resultText(data.groupName, NOTIFICATION_MENTOR_ACCEPT);
      case NotificationTypeEnum.METTORING_DECLIEND:
        return resultText(data.groupName, NOTIFICATION_MENTOR_DECLINE);
      case NotificationTypeEnum.JOIN_GROUP_REQUEST:
        return applyText(data.senderName, NOTIFICATION_GROUP_APPLY);
      case NotificationTypeEnum.MENTORING_REQUEST:
        return applyText(data.senderName, NOTIFICATION_MENTOR_APPLY);
    }
  };

  return <Container>{getNotificationString()}</Container>;
}

const Container = styled.span`
  width: 150px;
  font-weight: 600;
  white-space: pre;
`;

export default Message;
