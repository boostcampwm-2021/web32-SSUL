import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import { pushSelectedTechStack } from '../../../store/slices/selectedTechStack';
import { TechStack } from '../../../types/TechStack';

const MAX_SELECTED_INDEX = 5;

interface Props {
  listView: TechStack[];
}

function TechList({ listView }: Props): JSX.Element {
  const selectedTechList = useSelector<ReducerType, string[]>((state) => state.selectedTechStack);
  const selectedTechStackDispatch = useDispatch();

  const handleTechStackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedTechStack = e.target as HTMLButtonElement;
    const techStackName = clickedTechStack.innerText;
    clickedTechStack.classList.remove('shake');
    clickedTechStack.offsetWidth;

    if (selectedTechList.length >= MAX_SELECTED_INDEX) {
      clickedTechStack.classList.add('shake');
    } else selectedTechStackDispatch(pushSelectedTechStack(techStackName));
  };

  const techList = listView.map((category) => {
    if (selectedTechList.includes(category.name))
      return (
        <SelectedTechListItem key={category.tech_stack_id} onClick={handleTechStackClick}>
          {category.name}
        </SelectedTechListItem>
      );
    else {
      return (
        <TechListItem key={category.tech_stack_id} onClick={handleTechStackClick}>
          {category.name}
        </TechListItem>
      );
    }
  });

  return <Container>{techList}</Container>;
}

const Container = styled.div`
  display: grid;
  margin: 10px;

  grid-template-columns: repeat(7, minmax(100px, 2fr));
  grid-template-rows: repeat(auo-fit, minmax(100px, 2fr));

  background: ${(props) => props.theme.White};
  box-shadow: 0px 0px 30px -5px rgba(41, 36, 36, 0.25);
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
  margin: 10px;
  padding: 10px;

  color: ${(props) => props.theme.Gray3};
  background: ${(props) => props.theme.Gray5};
  box-shadow: 4px 4px 10px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
  border: none;
  cursor: pointer;

  &.shake {
    animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
`;

const SelectedTechListItem = styled.button`
  display: flex;
  margin: 10px;
  padding: 10px;

  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
  box-shadow: 4px 4px 10px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

export default TechList;
