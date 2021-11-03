import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TechSectionHeader from './TechSectionHeader';
import TechList from './TechList';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';

const dummyData: string[] = ['clear', 'react', 'node.js', 'javascript', 'typescript', 'java'];

function SearchFilterTechSection(): JSX.Element {
  const techStackInput = useSelector<ReducerType, string>((state) => state.techStackInput);
  const [techListView, setTechListView] = useState([...dummyData]);

  useEffect(() => {
    const newTechList = dummyData.filter((tech) => {
      return tech.includes(techStackInput);
    });
    setTechListView(newTechList);
  }, [techStackInput]);

  return (
    <Container>
      <TechSectionHeader />
      <TechList listView={techListView} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  min-width: 1000px;
  padding: 10px;

  background: ${(props) => props.theme.White};
  box-shadow: inset 2px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export default SearchFilterTechSection;
