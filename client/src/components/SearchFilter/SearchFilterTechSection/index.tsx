import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TechSectionHeader from './TechSectionHeader';
import TechList from './TechList';
import { useAppSelector } from '@hooks';
import { techStackHttpClient } from '@api';
import { TechStack } from '@types';
import { returnGroupRecruitFilterState } from '@store/slices/groupRecruitFilterSlice';

function SearchFilterTechSection(): JSX.Element {
  const techStackInput = useAppSelector(returnGroupRecruitFilterState).techStackInput;
  const [baseTechStackList, setBaseTechStackList] = useState<TechStack[]>([]);
  const [techListView, setTechListView] = useState<TechStack[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await techStackHttpClient.getTechStackList();
      setBaseTechStackList(data);
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
