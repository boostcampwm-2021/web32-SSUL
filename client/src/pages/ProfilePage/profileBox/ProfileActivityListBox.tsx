import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectProfileData, setProfileData } from '@store/slices/profileDataSlice';
import ProfileBoxContainer from './ProfileBoxContainer';
import { selectUser } from '@store/slices/userSlice';
import { groupHttpClient } from '@api';
import { formatDateToString } from '@utils/Date';

function ProfileActivityListBox(): JSX.Element {
  const { groupActivitys } = useAppSelector(selectProfileData);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchGroupActivityTechStack = async () => {
      if (user.id !== undefined) {
        const fetchedGroupActivity = await groupHttpClient.getGroupActivity(user.id);
        const groupActivitys = fetchedGroupActivity.map(({name, startAt, endAt}) =>{
          return {
            name: name,
            startAt: formatDateToString(startAt),
            endAt: formatDateToString(endAt)
          }
        }) 
        dispatch(setProfileData({groupActivitys: groupActivitys}))
      }
    }

    fetchGroupActivityTechStack();
  }, [user]);
  const getActivityList = () => {
    const listItems = groupActivitys.map(({ name, startAt, endAt }, idx) => {
      return <ActivityListItem key={idx}>{`${name} : ${startAt} ~ ${endAt}`}</ActivityListItem>;
    });
    return <ActivityList>{listItems}</ActivityList>;
  };
  return (
    <>
      <ProfileBoxContainer title="활동내역">{getActivityList()}</ProfileBoxContainer>
    </>
  );
}

const ActivityList = styled.ul`
  margin: 20px 40px;
`;

const ActivityListItem = styled.li`
  color: ${(props) => props.theme.Gray3};
  margin-top: 3px;
`;
export default ProfileActivityListBox;
