import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ProfileSideContents from './ProfileSideContents';
import { ProfileActivityListBox, ProfileIntroBox, ProfileTechStackBox } from './profileBox';
import ProfileMentorStackBox from './profileBox/ProfileMentorStackBox';
import ProfilePageModal from './modal';
import { useAppDispatch } from '@hooks';
import { clearProfileData } from '@store/slices/profileDataSlice';

function ProfilePage(): JSX.Element {
  const [modalType, setModalType] = useState<string>('NONE');
  const showModal = (type: string) => () => setModalType(type);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearProfileData());
    };
  }, []);

  return (
    <Container>
      <ProfileSideContents />
      <MainContents>
        <ProfileIntroBox />
        <ProfileTechStackBox showModal={showModal('EDIT_TECH_STACK')} />
        <ProfileActivityListBox />
        <Divider />
        <ProfileMentorStackBox showModal={showModal('CREATE_MENTOR_STACK')} />
      </MainContents>
      <ProfilePageModal type={modalType} onCancel={showModal('NONE')} />
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
