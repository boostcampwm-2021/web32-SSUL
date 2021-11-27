import React from 'react';
import styled from '@emotion/styled';
import cancelIcon from '@assets/icon_cancel.png';
import { NotificationData } from '@types';
import Message from './Message';
import { calculateNotificationTime } from '@utils/Date';

interface Props {
  data: NotificationData;
}
function ListItem({ data }: Props): JSX.Element {
  return (
    <Item>
      <CreatedDate>{calculateNotificationTime(data.createdAt)}</CreatedDate>
      <Message data={data} />
      <DeleteButton src={cancelIcon}></DeleteButton>
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 12px 15px 12px 15px;
  font-size: 0.8em;
  color: ${(props) => props.theme.Gray3};
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.Gray6};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.Gray6};
  }
`;

const CreatedDate = styled.span`
  width: 60px;
  font-weight: 500;
`;

const DeleteButton = styled.img`
  margin-left: 20px;
  padding: 6px;
  width: 20px;
  height: 20px;
`;

export default ListItem;
