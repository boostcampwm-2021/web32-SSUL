import React from 'react';
import styled from '@emotion/styled';
import { MentorUserInfo, TechStack } from '@types';
import { formatDateToString } from '@utils/Date';
import { MAX_SHOW_TECHSTACK } from '@constants/consts';

interface Props {
  user: MentorUserInfo;
  techStacks: TechStack[];
}

function MentorStatus({ user, techStacks }: Props): JSX.Element {
  const moreTechStackList = techStacks.map((techStack, idx) => {
    if (idx >= MAX_SHOW_TECHSTACK) return <MoreInfo key={techStack.id}>{techStack.name}</MoreInfo>;
  });

  const renderTechStackList = techStacks.map((techStack, idx) => {
    if (idx < MAX_SHOW_TECHSTACK)
      return <TechListItem key={techStack.id}>{techStack.name} </TechListItem>;
    if (idx === MAX_SHOW_TECHSTACK)
      return <MoreTechStack key={techStack.id}>...{moreTechStackList}</MoreTechStack>;
  });

  return (
    <Container>
      <MentorCreatedAt>Since. {formatDateToString(user.createdAt)}</MentorCreatedAt>
      <MentorIntro>{user.intro}</MentorIntro>
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
