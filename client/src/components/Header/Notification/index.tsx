import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import NotificationIcon from '../../../assets/icon_notification.svg';
import { BubbleModal } from '@components';
import { useAppDispatch } from '@hooks';
import { selectNotficationList, setNotificationList } from '@store/notification/slice';
import { useSelector } from 'react-redux';
import { notificationHttpClient } from '@api';

function Notification(): JSX.Element {
  const dispatch = useAppDispatch();
  const { notificationList } = useSelector(selectNotficationList);
  const hasNewNotification = useRef<boolean>(false);
  const [isModalClicked, setIsModalClicked] = useState<boolean>(false);
  const handleWindowClick = () => setIsModalClicked(false);
  const handleNotificationButtonClick = () => setIsModalClicked(true);

  useEffect(() => {
    isModalClicked
      ? window.addEventListener('click', handleWindowClick)
      : window.removeEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  }, [isModalClicked]);

  const fetchNotificationList = async () => {
    const notificationList = await notificationHttpClient.getNotificationList();
    dispatch(setNotificationList({ notificationList: notificationList }));
  };

  useEffect(() => {
    fetchNotificationList();
    const refreshIntervalId = setInterval(() => {
      fetchNotificationList();
    }, 1000);
    return () => clearInterval(refreshIntervalId);
  }, []);

  if (notificationList.some(({ readChk }) => !readChk)) hasNewNotification.current = true;
  else hasNewNotification.current = false;

  return (
    <Container>
      <NotificationButton src={NotificationIcon} onClick={handleNotificationButtonClick} />
      {hasNewNotification.current && <NotificationCircle />}
      {isModalClicked && (
        <BubbleModal type="notification-modal" items={[]} headerVisibility={true} />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin: 0px 24px 0px 0px;
  cursor: pointer;
`;

const NotificationCircle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 1px;
  margin-right: -4px;
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.theme.Primary};
  border-radius: 50%;
`;
const NotificationButton = styled.img`
  width: 16px;
`;

export default Notification;
