import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ProfileSideContents from './ProfileSideContents';
import { ProfileActivityListBox, ProfileIntroBox, ProfileTechStackBox } from './profileBox';
import ProfileMentorStackBox from './profileBox/ProfileMentorStackBox';
import ProfilePageModal from './modal';
import { useAppDispatch, useAppSelector } from '@hooks';
import { clearProfileData, setProfileData } from '@store/slices/profileDataSlice';
import { toggleLoadingState } from '@store/slices/utilSlice';
import { selectUser } from '@store/slices/userSlice';
import { groupHttpClient, mentoringHttpClient, techStackHttpClient, userHttpClient } from '@api';
import { formatDateToString } from '@utils/Date';

function ProfilePage(): JSX.Element {
  const [modalType, setModalType] = useState<string>('NONE');
  const [fetchState, setFetchState] = useState<boolean>(  false);
  const user = useAppSelector(selectUser);
  const showModal = (type: string) => () => setModalType(type);
  const dispatch = useAppDispatch();

  const fetchProfileIntro = async (userId: number) => {
    const fetchedIntro = await userHttpClient.getIntro(userId);
    dispatch(setProfileData({ intro: fetchedIntro }));
  };

  const fetchMentoringStack = async (userId: number) => {
      const fetchedMentoringStacks = await techStackHttpClient.getMentorTechStackList(userId);
      const mentoringStacks = fetchedMentoringStacks.map(({ name }) => name);

      dispatch(setProfileData({ mentoringStack: mentoringStacks }));
  };

  const fetchMentorInfo = async (userId: number) => {
      const { mentorId, isMentor } = await mentoringHttpClient.getMentorId(userId);
      dispatch(setProfileData({ mentorId, isMentor }));
  };

  const fetchProfileTechStack = async (userId: number) => {
      const fetchedTechStack = await techStackHttpClient.getMenteeTechStackList(userId);
      const techStackList = fetchedTechStack.map(({ name }) => name);
      dispatch(setProfileData({ techStacks: techStackList }));
  };

  const fetchGroupActivityTechStack = async (userId: number) => {
      const fetchedGroupActivity = await groupHttpClient.getGroupActivity(userId);
      const groupActivitys = fetchedGroupActivity.map(({name, startAt, endAt}) =>{
        return {
          name: name,
          startAt: formatDateToString(startAt),
          endAt: formatDateToString(endAt)
        }
      }) 
      dispatch(setProfileData({groupActivitys: groupActivitys}))
  }

  useEffect(() => {
    const fetchAllData = async (userId: number) => {
      try{
        await fetchMentorInfo(userId);
        await fetchMentoringStack(userId);
        await fetchProfileIntro(userId);
        await fetchProfileTechStack(userId);
        await fetchGroupActivityTechStack(userId);

        setFetchState(true);
        dispatch(toggleLoadingState());
      }catch(e){
        console.log(e);
      }
    };
    
    if(user.id !== undefined){
      fetchAllData(user.id);
    }
  }, [user]);

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
