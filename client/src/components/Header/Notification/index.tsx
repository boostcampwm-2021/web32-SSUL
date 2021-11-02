import React from 'react';
import styled from '@emotion/styled';
import NotificationIcon from '../../../assets/icon_notification.svg';

function Notification(): JSX.Element {
  return (
    <Container>
      <NotificationButton src={NotificationIcon} />
    </Container>
  );
}

const Container = styled.div`
  margin: 0px 24px 0px 0px;
  cursor: pointer;
`;

const NotificationButton = styled.img`
  width: 16px;
`;

export default Notification;
