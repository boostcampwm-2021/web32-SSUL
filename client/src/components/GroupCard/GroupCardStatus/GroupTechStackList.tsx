import React from 'react';
import styled from '@emotion/styled';
import { TechStack } from '@types';

interface Props {
  techStackList: TechStack[];
}

const MAX_SHOW_TECHSTACK = 3;

function GroupTechStackList({ techStackList }: Props): JSX.Element {
  const moreTechStackList = techStackList.map((techStack, idx) => {
    if (idx >= MAX_SHOW_TECHSTACK) return <MoreInfo key={idx}>{techStack.name}</MoreInfo>;
  });

  const renderTechStackList = techStackList.map((techStack, idx) => {
    if (idx < MAX_SHOW_TECHSTACK) return <TechListItem key={idx}>{techStack.name} </TechListItem>;
    if (idx === MAX_SHOW_TECHSTACK)
      return <MoreTechStack key={idx}>...{moreTechStackList}</MoreTechStack>;
  });

  return <TechList>{renderTechStackList}</TechList>;
}

const TechList = styled.div`
  display: flex;
  margin: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
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
export default GroupTechStackList;
