import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TechSectionHeader from './TechSectionHeader';
import TechList from './TechList';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import { getTechStackList } from '../../../api/techStack';
import { TechStack } from '../../../types/TechStack';

const dummyData: string[] = [
  'clear',
  'react',
  'node.js',
  'java',
  'test1',
  'test2',
  'test3',
  'test4',
  'test5',
];

function SearchFilterTechSection(): JSX.Element {
  const techStackInput = useSelector<ReducerType, string>((state) => state.techStackInput);
  const [baseTechStackList, setBaseTechStackList] = useState<TechStack[]>([]);
  const [techListView, setTechListView] = useState<TechStack[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getTechStackList();
      setBaseTechStackList(data);
      return data;
    };
    getData();
  }, []);

  useEffect(() => {
    const newTechList = baseTechStackList.filter((tech) => {
      return tech.name.includes(techStackInput);
    });
    setTechListView(newTechList);
  }, [techStackInput, baseTechStackList]);

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
