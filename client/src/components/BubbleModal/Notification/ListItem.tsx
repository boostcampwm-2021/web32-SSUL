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

interface StyledProps {
  isView: boolean;
}

function ListItem({ idx, data }: Props): JSX.Element {
  const { notificationList } = useAppSelector(selectNotficationList);
  const history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleItemClick = (e: React.MouseEvent) => {
    const newList = notificationList.map((notification) => {
      return { ...notification };
    });

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

    newList[idx].readChk = 1;
    dispatch(setNotificationList({ notificationList: newList }));
  };

  const handleDeleteButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newList = [...notificationList];

    //TODO: DELETE API REQUEST
    newList.splice(idx, 1);
    dispatch(setNotificationList({ notificationList: newList }));
  };
  return (
    <Item onClick={handleItemClick} isView={data.readChk !== 0}>
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
  color: ${(props) =>
    ({ isView }: StyledProps) =>
      isView ? props.theme.Gray4 : props.theme.Gray2};
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.Gray6};
  cursor: pointer;
`;

const CreatedDate = styled.span`
  width: 60px;
  margin-right: 10px;
  text-align: center;
  font-weight: 400;
`;

const DeleteButton = styled.img`
  margin-left: 20px;
  padding: 6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  &:hover {
    background-color: ${(props) => props.theme.Gray6};
  }
`;

export default ListItem;
