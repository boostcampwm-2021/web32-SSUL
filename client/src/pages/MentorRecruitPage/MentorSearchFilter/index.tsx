import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TechSectionHeader from './TechSectionHeader';
import TechList from './TechList';
import { useAppSelector } from '@hooks';
import { techStackHttpClient } from '@api';
import { TechStack } from '@types';
import { returnMentorRecruitFilterState } from '@store/mentor/filterSlice';

function MentorSearchFilter(): JSX.Element {
  const { techStackInput } = useAppSelector(returnMentorRecruitFilterState);
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

  background: ${(props) => props.theme.White};
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export default MentorSearchFilter;
