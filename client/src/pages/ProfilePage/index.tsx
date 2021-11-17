import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ProfileSideContents from './ProfileSideContents';
import { ProfileActivityListBox, ProfileIntroBox, ProfileTechStackBox } from './profileBox';
import ProfileMentorStackBox from './profileBox/ProfileMentorStackBox';
import ProfilePageModal from './modal';
import { useAppDispatch, useAppSelector } from '@hooks';
import { toggleLoadingState } from '@store/slices/utilSlice';
import {
  clearProfileData,
  selectProfileData,
  setProfileData,
} from '@store/slices/profileDataSlice';
import {
  fetchGroupActivityTechStack,
  fetchMentorInfo,
  fetchMentoringStack,
  fetchProfileIntro,
  fetchProfileTechStack,
  fetchSideContents,
  ProfileState,
} from './FetchProfileData';

function ProfilePage(): JSX.Element {
  const [modalType, setModalType] = useState<string>('NONE');
  const [fetchState, setFetchState] = useState<boolean>(false);
  const profile = useAppSelector(selectProfileData);
  const showModal = (type: string) => () => setModalType(type);
  const dispatch = useAppDispatch();
  const handler = (newState: ProfileState) => dispatch(setProfileData(newState));

  useEffect(() => {
    const fetchAllData = async (userId: number) => {
      await fetchMentorInfo(userId, handler);
      await fetchMentoringStack(userId, handler);
      await fetchProfileIntro(userId, handler);
      await fetchProfileTechStack(userId, handler);
      await fetchGroupActivityTechStack(userId, handler);

      setFetchState(true);
      dispatch(toggleLoadingState());
    };

    if (profile.userId !== -1) fetchAllData(profile.userId);
    else fetchSideContents(handler);
  }, [profile.userId]);

  useEffect(() => {
    dispatch(toggleLoadingState());
    return () => {
      dispatch(clearProfileData());
    };
  }, []);

  return (
    <Container>
      {fetchState ? (
        <>
          <ProfileSideContents />
          <MainContents>
            <ProfileIntroBox />
            <ProfileTechStackBox showModal={showModal('EDIT_TECH_STACK')} />
            <ProfileActivityListBox />
            <Divider />
            <ProfileMentorStackBox
              showRequestModal={showModal('REQUEST_MENTORING')}
              showCreateModal={showModal('CREATE_MENTOR_STACK')}
            />
          </MainContents>
          <ProfilePageModal type={modalType} onCancel={showModal('NONE')} />
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  margin-top: 40px;
  height: 1px;
  background-color: ${(props) => props.theme.Gray5};
`;
export default ProfilePage;
