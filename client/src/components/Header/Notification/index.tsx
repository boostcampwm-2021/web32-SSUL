import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import NotificationIcon from '../../../assets/icon_notification.svg';
import { BubbleModal } from '@components';
import { useAppDispatch } from '@hooks';
import { setNotificationList } from '@store/notification/slice';

function Notification(): JSX.Element {
  const dispatch = useAppDispatch();
  const dummy = [
    {
      id: 1,
      senderId: 4,
      recieverId: 2,
      groupId: 3,
      type: 'JOIN_GROUP_REQUEST',
      createdAt: '2021-11-27T03:06:55.000Z',
      readChk: 0,
      senderName: '유찬양',
      groupName: '알고리즘 스터디',
    },
    {
      id: 2,
      senderId: 4,
      recieverId: 2,
      groupId: 3,
      type: 'MENTORING_ACCEPTED',
      createdAt: '2021-11-26T03:06:55.000Z',
      readChk: 0,
      senderName: '유찬양',
      groupName: '타입스크립트 스터디',
    },
    {
      id: 3,
      senderId: 4,
      recieverId: 2,
      groupId: 3,
      type: 'MENTORING_REQUEST',
      createdAt: '2021-11-25T03:06:55.000Z',
      readChk: 1,
      senderName: '유찬양',
      groupName: '',
    },
  ];

  const [isModalClicked, setIsModalClicked] = useState<boolean>(false);
  const handleWindowClick = () => setIsModalClicked(false);
  const handleNotificationButtonClick = () => setIsModalClicked(true);

  useEffect(() => {
    //TODO GET NotificationList
    dispatch(setNotificationList({ notificationList: dummy }));
    isModalClicked
      ? window.addEventListener('click', handleWindowClick)
      : window.removeEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  }, [isModalClicked]);

  return (
    <Container>
      <NotificationButton src={NotificationIcon} onClick={handleNotificationButtonClick} />
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

const NotificationButton = styled.img`
  width: 16px;
`;

export default Notification;
