import React from 'react';
import styled from '@emotion/styled';
import { SearchFilter, GroupCard } from '@components';
import { Group } from '@types';
import { dummyData } from './dummy';
import { useAppSelector } from '@hooks';
import { returnGroupRecruitFilterState } from '@store/slices/groupRecruitFilterSlice';

function GroupRecruitPage(): JSX.Element {
  const { selectedCategory } = useAppSelector(returnGroupRecruitFilterState);

  const isFilterdData = (groupData: Group) => {
    const { name } = groupData;
    if (containGroupInput(name)) return true;
    else return false;
  };

  const containGroupInput = (groupName: string | null) => {
    return groupName?.includes('');
  };

  const renderGroupCards = dummyData.map((groupData: Group) => {
    if (isFilterdData(groupData)) return <GroupCard key={groupData.id} groupContents={groupData} />;
  });

  return (
    <Container>
      <SearchFilter />
      <GroupCardList>{renderGroupCards}</GroupCardList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
`;

const GroupCardList = styled.div`
  display: grid;
  margin: 10px auto;

  grid-template-columns: repeat(4, minmax(250px, 2fr));
  grid-template-rows: repeat(auo-fit, minmax(100px, 2fr));
`;
export default GroupRecruitPage;
