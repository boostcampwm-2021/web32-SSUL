import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TechSectionHeader from './TechSectionHeader';
import TechList from './TechList';
import { useAppSelector } from '@hooks';
import { techStackHttpClient } from '@api';
import { TechStack } from '@types';
import { returnGroupRecruitFilterState } from '@store/group/filterSlice';

function SearchFilterTechSection(): JSX.Element {
  const { techStackInput } = useAppSelector(returnGroupRecruitFilterState);
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
    <TechStackSection>
      <TechSectionHeader />
      <TechList listView={techListView} />
    </TechStackSection>
  );
}

const TechStackSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  padding: 10px;

  border: 1px ${(props) => props.theme.Gray5} solid;
  box-shadow: ${(props) => props.theme.Shadow};
  background-color: ${(props) => props.theme.Box};
  border-radius: 20px;
`;

export default SearchFilterTechSection;
