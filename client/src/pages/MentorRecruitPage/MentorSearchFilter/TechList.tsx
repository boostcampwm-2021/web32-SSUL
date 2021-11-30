import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  pushSelectedTechStack,
  returnMentorRecruitFilterState,
  createdFilterdQuery,
} from '@store/mentor/filterSlice';
import { TechStack } from '@types';

const MAX_SELECTED_INDEX = 5;

interface Props {
  listView: TechStack[];
}

function TechList({ listView }: Props): JSX.Element {
  const { selectedTechStack } = useAppSelector(returnMentorRecruitFilterState);
  const selectedTechStackDispatch = useAppDispatch();

  const handleTechStackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedTechStack = e.target as HTMLButtonElement;
    const techStackName = clickedTechStack.innerText;
    clickedTechStack.classList.remove('shake');
    clickedTechStack.offsetWidth;

    if (selectedTechStack.length >= MAX_SELECTED_INDEX) {
      clickedTechStack.classList.add('shake');
    } else {
      selectedTechStackDispatch(pushSelectedTechStack(techStackName));
      selectedTechStackDispatch(createdFilterdQuery());
    }
  };

  const techList = listView.map((techStack) => {
    if (selectedTechStack.includes(techStack.name))
      return (
        <SelectedTechListItem key={techStack.id} onClick={handleTechStackClick}>
          {techStack.name}
        </SelectedTechListItem>
      );
    else {
      return (
        <NonSelectedTechListItem key={techStack.id} onClick={handleTechStackClick}>
          {techStack.name}
        </NonSelectedTechListItem>
      );
    }
  });

  return <Container>{techList}</Container>;
}

const Container = styled.div`
  display: flex;
  margin: auto 10px;

  grid-template-rows: repeat(auto-fill);
  background-color: ${(props) => props.theme.Box};
  border-radius: 10px;
`;

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const TechListItem = styled.button`
  display: flex;
  margin: 5px 5px;
  padding: 0px 10px;

  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);

  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

const SelectedTechListItem = styled(TechListItem)`
  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
`;

const NonSelectedTechListItem = styled(TechListItem)`
  color: ${(props) => props.theme.Gray3};
  background: ${(props) => props.theme.Gray6};
  &.shake {
    animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
`;

export default TechList;
