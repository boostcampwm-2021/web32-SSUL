import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import { pushSelectedTechStack } from '../../../store/slices/selectedTechStack';

interface Props {
  listView: string[];
}

function TechList({ listView }: Props): JSX.Element {
  const selectedTechList = useSelector<ReducerType, string[]>((state) => state.selectedTechStack);
  const selectedTechStackDispatch = useDispatch();

  const handleTechStackClick = (e: any) => {
    const clickedTechStack = e.target.innerHTML;
    selectedTechStackDispatch(pushSelectedTechStack(clickedTechStack));
  };

  const techList = listView.map((category, idx) => {
    if (selectedTechList.includes(category))
      return (
        <SelectedTechListItem key={idx} onClick={handleTechStackClick}>
          {category}
        </SelectedTechListItem>
      );
    else {
      return (
        <TechListItem key={idx} onClick={handleTechStackClick}>
          {category}
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
