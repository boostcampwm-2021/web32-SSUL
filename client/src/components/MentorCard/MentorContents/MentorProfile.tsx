import React from 'react';
import styled from '@emotion/styled';
import { MentorUserInfo } from '@types';
import { GAUGE_BAR_DEFAULT_INDEX } from '@constants/consts';

interface Props {
  user: MentorUserInfo;
}

function MentorProfile({ user }: Props): JSX.Element {
  return (
    <Container>
      <Profile>
        <ProfileImage src={user.avatarUrl} alt="프로필 이미지" />
        <ProfileName>{user.name}</ProfileName>
      </Profile>
      <ShareStack style={{ width: `${GAUGE_BAR_DEFAULT_INDEX + user.shareStack}px` }}>
        <ShareNum>{user.shareStack}</ShareNum>
      </ShareStack>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-between;
`;

const Profile = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
`;

const ShareStack = styled.div`
  height: 20px;
  width: ${(props) => props.style?.width};
  align-self: center;
  background-color: ${(props) => props.theme?.Share};
  border-radius: 10px;
  cursor: pointer;

  &:hover > span {
    display: flex;
    color: ${(props) => props.theme?.White};
  }
`;

const ShareNum = styled.span`
  display: none;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ProfileName = styled.h4`
  display: flex;
  margin: 14px 0;
`;
export default MentorProfile;
