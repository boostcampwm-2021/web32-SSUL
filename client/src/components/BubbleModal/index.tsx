import React from 'react';
import styled from '@emotion/styled';
import MenuHeader from './Profile/MenuHeader';
import MenuItem from './Profile/MenuItem';
import { BubbleModalProfileItem } from '@types';
import ListItem from './Notification/ListItem';
import { useAppSelector } from '@hooks';
import { selectNotficationList } from '@store/notification/slice';
import EmptyItem from './Notification/EmptyItem';

interface Props {
  type: string;
  items: BubbleModalProfileItem[];
  headerVisibility: boolean;
}

function BubbleModal({ type, items, headerVisibility }: Props): JSX.Element {
  const { notificationList } = useAppSelector(selectNotficationList);
  if (type === 'profile-modal') {
    const ProfileModalItemList = items.map((item, idx) => {
      return <MenuItem name={item.name} onClick={item.handleModalItemClick} key={idx} />;
    });

    return (
      <ProfileModalContainer>
        {headerVisibility && MenuHeader()}
        {ProfileModalItemList}
      </ProfileModalContainer>
    );
  }

  if (notificationList.length === 0)
    return (
      <NotificationModalContainer>
        <EmptyItem />
      </NotificationModalContainer>
    );
  
  return (
    <NotificationModalContainer>
      {notificationList.map((notificationData, idx) => (
        <ListItem key={notificationData.id} data={notificationData} idx={idx} />
      ))}
    </NotificationModalContainer>
  );
}

const ProfileModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 52px;
  right: -200%;
  width: 200px;
  background: ${(props) => props.theme.White};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.Gray6};
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  z-index: 9999;
`;

const NotificationModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 52px;
  right: -800%;
  width: 300px;
  min-height: 60px;
  background: ${(props) => props.theme.White};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.Gray6};
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  z-index: 9999;
`;

export default BubbleModal;
