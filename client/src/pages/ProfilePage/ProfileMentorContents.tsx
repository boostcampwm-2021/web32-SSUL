import React from 'react';
import styled from '@emotion/styled';

function ProfileMentorContents(): JSX.Element {
  return (
    <Container>
      <Divider />
      <MentoringRequestButton>멘토요청 리스트</MentoringRequestButton>
      <MentorTechStackBox>
        <p>멘토링 스택</p>
      </MentorTechStackBox>
    </Container>
  );
}

const Container = styled.div`
  width: 650px;
  margin: auto;
`;

const Divider = styled.div`
  margin-top: 40px;
  height: 1px;
  background-color: ${(props) => props.theme.Gray5};
`;

const MentorTechStackBox = styled.div`
  padding: 25px;
  margin: 20px auto;
  width: 600px;
  min-height: 100px;
  border-radius: 10px;
  border: 1px ${(props) => props.theme.White} solid;
  box-shadow: inset 0px 0px 4px rgb(0 0 0 / 25%);
`;

const MentoringRequestButton = styled.button`
  margin-top: 20px;
  margin-left: 520px;
  width: 120px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
`;
export default ProfileMentorContents;
