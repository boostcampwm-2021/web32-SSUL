import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import NotificationIcon from '../../../assets/icon_notification.svg';
import { BubbleModal } from '@components';

function Notification(): JSX.Element {
  const [isModalClicked, setIsModalClicked] = useState<boolean>(false);

  const handleWindowClick = () => setIsModalClicked(false);
  const handleNotificationButtonClick = () => setIsModalClicked(true);

  useEffect(() => {
    isModalClicked
      ? window.addEventListener('click', handleWindowClick)
      : window.removeEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  }, [isModalClicked]);

  return (
    <Container>
      <NotificationButton src={NotificationIcon} onClick={handleNotificationButtonClick} />
      {isModalClicked && <BubbleModal type="notification-modal" items={[]} headerVisibility={true} />}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin: 0px 24px 0px 0px;
  cursor: pointer;
`;

const NotificationButton = styled.img`
  width: 16px;
`;

export default Notification;
