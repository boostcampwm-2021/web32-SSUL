import React from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from '@hooks';
import { selectProfileData } from '@store/user/profileSlice';
import ProfileBoxContainer from './ProfileBoxContainer';

function ProfileActivityListBox(): JSX.Element {
  const { groupActivitys } = useAppSelector(selectProfileData);

  const getActivityList = () => {
    const listItems = groupActivitys.map(({ name, startAt, endAt }, idx) => {
      return <ActivityListItem key={idx}>{`${name} : [ ${startAt} ~ ${endAt} ]`}</ActivityListItem>;
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
  margin-top: 5px;
`;
export default ProfileActivityListBox;
