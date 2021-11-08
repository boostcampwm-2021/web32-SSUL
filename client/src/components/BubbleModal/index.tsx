import React from 'react';
import styled from '@emotion/styled';
import MenuHeader from './Profile/MenuHeader';
import MenuItem from './Profile/MenuItem';
import { BubbleModalProfileItem } from '@types';

interface Props {
  type: string;
  items: BubbleModalProfileItem[];
  headerVisibility: boolean;
}

function BubbleModal({ type, items, headerVisibility }: Props): JSX.Element {
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

  return <NotificationModalContainer></NotificationModalContainer>;
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
`;

const NotificationModalContainer = styled.div`
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
`;

export default BubbleModal;
