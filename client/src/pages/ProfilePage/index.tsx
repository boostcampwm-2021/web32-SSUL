import React, { useState } from 'react';
import styled from '@emotion/styled';
import ProfileSideContents from './ProfileSideContents';
import { ProfileActivityListBox, ProfileIntroBox, ProfileTechStackBox } from './profileBox';
import ProfileMentorStackBox from './profileBox/ProfileMentorStackBox';
import { BoxModal } from '@components';
import EditTechStack from './modal/EditTechStack';

function ProfilePage(): JSX.Element {
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModalBackgroundClick = () => setIsModal(false);
  const handleEditButtonClick = () => setIsModal(true);
  return (
    <Container>
      <ProfileSideContents />
      <MainContents>
        <ProfileIntroBox />
        <ProfileTechStackBox handleEditButtonClick={handleEditButtonClick}/>
        <ProfileActivityListBox />
        <Divider />
        <ProfileMentorStackBox />
      </MainContents>

      {isModal && (
        <BoxModal
          style={{
            width: '700px',
            height: '400px',
            padding: '50px 50px 50px 50px',
          }}
          element={
            <EditTechStack currentUsingTechStacks={[]} onCancel={handleModalBackgroundClick} />
          }
          onCancel={handleModalBackgroundClick}
        />
      )}
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
