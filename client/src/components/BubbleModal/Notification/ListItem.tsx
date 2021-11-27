import React from 'react';
import styled from '@emotion/styled';
import cancelIcon from '@assets/icon_cancel.png';
import { NotificationData } from '@types';
import Message from './Message';
import { calculateNotificationTime } from '@utils/Date';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectNotficationList, setNotificationList } from '@store/notification/slice';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUser } from '@store/user/globalSlice';

interface Props {
  idx: number;
  data: NotificationData;
}
function ListItem({ idx, data }: Props): JSX.Element {
  const { notificationList } = useAppSelector(selectNotficationList);
  const history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleItemClick = () => {
    switch (data.type) {
      case 'JOIN_GROUP_ACCEPTED':
        history.push('/group/status');
        break;
      case 'MENTORING_ACCEPTED':
        history.push('/group/status');
        break;
      case 'JOIN_GROUP_REQUEST':
        history.push(`/group/owner/${data.groupId}`);
        break;
      case 'MENTORING_REQUEST':
        history.push(`/profile/${user.oAuthId}`);
        break;
    }
  };
  const handleDeleteButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newList = [...notificationList];

    //TODO: DELETE API REQUEST
    newList.splice(idx, 1);
    dispatch(setNotificationList({ notificationList: newList }));
  };
  return (
    <Item onClick={handleItemClick}>
      <CreatedDate>{calculateNotificationTime(data.createdAt)}</CreatedDate>
      <Message data={data} />
      <DeleteButton src={cancelIcon} onClick={handleDeleteButtonClick}></DeleteButton>
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
  color: ${(props) => props.theme.Gray2};
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.Gray6};
  cursor: pointer;
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
