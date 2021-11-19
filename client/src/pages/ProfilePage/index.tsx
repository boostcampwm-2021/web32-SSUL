import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ProfileSideContents from './ProfileSideContents';
import { ProfileActivityListBox, ProfileIntroBox, ProfileTechStackBox } from './profileBox';
import ProfileMentorStackBox from './profileBox/ProfileMentorStackBox';
import ProfilePageModal from './modal';
import { useAppDispatch, useAppSelector } from '@hooks';
import { setLoadingState } from '@store/util/Slice';
import { clearProfileData, selectProfileData, setProfileData } from '@store/user/profileSlice';
import {
  fetchGroupActivityTechStack,
  fetchMentorId,
  fetchMentoringStack,
  fetchProfileIntro,
  fetchProfileTechStack,
  fetchBaseUserData,
  ProfileState,
} from './FetchProfileData';
import { useParams } from 'react-router-dom';

export interface Param {
  id: string;
}

function ProfilePage(): JSX.Element {
  const { id } = useParams<Param>();
  const [modalType, setModalType] = useState<string>('NONE');
  const [fetchState, setFetchState] = useState<boolean>(false);
  const profile = useAppSelector(selectProfileData);
  const showModal = (type: string) => () => setModalType(type);
  const dispatch = useAppDispatch();
  const handler = (newState: ProfileState) => dispatch(setProfileData(newState));

  useEffect(() => {
    const fetchAllData = async (userId: number) => {
      try {
        await Promise.all([
          fetchMentorId(userId, handler),
          fetchMentoringStack(userId, handler),
          fetchProfileIntro(userId, handler),
          fetchProfileTechStack(userId, handler),
          fetchGroupActivityTechStack(userId, handler),
        ]);
        setFetchState(true);
        dispatch(setLoadingState(false));
      } catch (e) {
        location.href = '/';
      }
    };

    if (profile.gitHubId === id) fetchAllData(profile.userId);
  }, [profile.gitHubId]);

  useEffect(() => {
    dispatch(setLoadingState(true));
    setFetchState(false);
    dispatch(clearProfileData());
    fetchBaseUserData(handler, id);

    return () => {
      dispatch(clearProfileData());
    };
  }, [id]);

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
