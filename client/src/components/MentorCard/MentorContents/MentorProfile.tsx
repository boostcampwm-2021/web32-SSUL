import React from 'react';
import styled from '@emotion/styled';

function MentorProfile(): JSX.Element {
  return (
    <Container>
      <Profile>
        <ProfileImage src={`https://avatars.githubusercontent.com/u/48426909?v=4`} />
        <ProfileName>이유찬</ProfileName>
      </Profile>
      <ShareStack style={{ width: '80px' }}>
        <ShareNum>37.5</ShareNum>
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
