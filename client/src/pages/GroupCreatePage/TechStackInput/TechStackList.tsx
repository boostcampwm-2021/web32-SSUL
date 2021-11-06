import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import { setGroupData } from '../../../store/slices/createGroupData';
import { GroupData } from '../../../types/CreateGroup';
import { TechStack } from '../../../types/TechStack';

const MAX_SELECTED_INDEX = 5;

interface Props {
  techStackList: TechStack[];
}
function TechStackList({ techStackList }: Props): JSX.Element {
  const { selectedTechStack } = useSelector<ReducerType, GroupData>(
    (state) => state.createGroupData,
  );
  const dispatch = useDispatch();
  const handleTechStackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedTechStack = e.target as HTMLButtonElement;
    const techStackName = clickedTechStack.innerText;

    clickedTechStack.classList.remove('shake');
    clickedTechStack.offsetWidth;

    if (selectedTechStack.length >= MAX_SELECTED_INDEX) {
      clickedTechStack.classList.add('shake');
    } else if (!selectedTechStack.includes(techStackName)) {
      const newTechStack: string[] = [...selectedTechStack];

      newTechStack.push(techStackName);
      dispatch(setGroupData({ selectedTechStack: newTechStack }));
    }
  };
  const techStackElements = techStackList.map((techStack, idx) => {
    return selectedTechStack.includes(techStack.name) ? (
      <SelectedTechListItem key={idx}>{techStack.name}</SelectedTechListItem>
    ) : (
      <TechListItem key={idx} onClick={handleTechStackClick}>
        {techStack.name}
      </TechListItem>
    );
  });

  return <Container>{techStackElements}</Container>;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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

const SelectedTechListItem = styled(TechListItem)`
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
`;
export default TechStackList;
