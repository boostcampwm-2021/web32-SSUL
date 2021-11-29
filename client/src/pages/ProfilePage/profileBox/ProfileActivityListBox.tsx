import React from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from '@hooks';
import { selectProfileData } from '@store/user/profileSlice';
import ProfileBoxContainer from './ProfileBoxContainer';
import { ACTIVITY_LIST } from '@constants/consts';

function ProfileActivityListBox(): JSX.Element {
  const { groupActivitys } = useAppSelector(selectProfileData);

  const getActivityList = () => {
    const listItems = groupActivitys.map(({ name, startAt, endAt }, idx) => {
      return (
        <ActivityListItem
          data-test="group-activity"
          key={idx}
        >{`${name} : [ ${startAt} ~ ${endAt} ]`}</ActivityListItem>
      );
    });
    return <ActivityList>{listItems}</ActivityList>;
  };
  return (
    <>
      <ProfileBoxContainer title={ACTIVITY_LIST}>{getActivityList()}</ProfileBoxContainer>
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
