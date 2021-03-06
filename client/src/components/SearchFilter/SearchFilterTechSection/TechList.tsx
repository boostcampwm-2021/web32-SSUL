import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  pushSelectedTechStack,
  returnGroupRecruitFilterState,
  createdFilterdQuery,
} from '@store/group/filterSlice';
import { TechStack } from '@types';
import { MAX_SELECT_TECHSTACK_CNT } from '@constants/consts';

interface Props {
  listView: TechStack[];
}

function TechList({ listView }: Props): JSX.Element {
  const { selectedTechStack } = useAppSelector(returnGroupRecruitFilterState);
  const selectedTechStackDispatch = useAppDispatch();

  const handleTechStackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedTechStack = e.target as HTMLButtonElement;
    const techStackName = clickedTechStack.innerText;
    clickedTechStack.classList.remove('shake');
    clickedTechStack.offsetWidth;

    if (selectedTechStack.length >= MAX_SELECT_TECHSTACK_CNT) {
      clickedTechStack.classList.add('shake');
    } else {
      selectedTechStackDispatch(pushSelectedTechStack(techStackName));
      selectedTechStackDispatch(createdFilterdQuery());
    }
  };

  const techList = listView.map((category) => {
    if (selectedTechStack.includes(category.name))
      return (
        <SelectedTechListItem key={category.id} onClick={handleTechStackClick}>
          {category.name}
        </SelectedTechListItem>
      );
    else {
      return (
        <NonSelectedTechListItem key={category.id} onClick={handleTechStackClick}>
          {category.name}
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

  background: ${(props) => props.theme.White};

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

  box-shadow: ${(props) => props.theme.Shadow};

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
