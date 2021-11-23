import React from 'react';
import styled from '@emotion/styled';

const MAX_SHOW_TECHSTACK = 3;

const techStackList = ['node.js', 'react', 'typescript', 'python', 'SADFDFS'];

function MentorStatus(): JSX.Element {
  const moreTechStackList = techStackList.map((techStack, idx) => {
    if (idx >= MAX_SHOW_TECHSTACK) return <MoreInfo key={idx}>{techStack}</MoreInfo>;
  });

  const renderTechStackList = techStackList.map((techStack, idx) => {
    if (idx < MAX_SHOW_TECHSTACK) return <TechListItem key={idx}>{techStack} </TechListItem>;
    if (idx === MAX_SHOW_TECHSTACK)
      return <MoreTechStack key={idx}>...{moreTechStackList}</MoreTechStack>;
  });

  return (
    <Container>
      <MentorCreatedAt>Since. 2021-07-14</MentorCreatedAt>
      <MentorIntro>
        나는 자바스크립트 개발자입니다. 타입스크립트로도 개발하고요. 자바로도 개발하고요. C#으로도
        개발하고요. C++로도 하고요. 파이썬으로도 한답니다. 다 합니다.
      </MentorIntro>
      <TechList>{renderTechStackList}</TechList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-between;
`;

const MentorCreatedAt = styled.h3`
  color: ${(props) => props.theme.Gray4};
`;

const MentorIntro = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  width: 280px;
  height: 80px;
  padding: 10px;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 10px 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${(props) => props.theme.Gray4};
`;

const TechList = styled.div`
  display: flex;
  margin: 10px;
`;

const TechListItem = styled.button`
  display: flex;
  margin: 5px;
  padding: 0px 8px;
  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  border-radius: 10px;
  border: none;
`;

const MoreTechStack = styled(TechListItem)`
  cursor: pointer;
  width: 28px;

  &:hover > span {
    display: flex;
  }
`;

const MoreInfo = styled.span`
  display: none;
  position: relative;
  bottom: -30px;
  left: -150px;
  padding: 0px 8px;
  margin-left: 10px;
  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
  border-radius: 10px;
`;

export default MentorStatus;
