import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { SearchFilter, GroupCard } from '@components';
import { GroupResponse } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  initFilterState,
  returnGroupRecruitFilterState,
} from '@store/slices/groupRecruitFilterSlice';
import { groupHttpClient } from '@api';
import { toggleLoadingState } from '@store/slices/utilSlice';

function GroupRecruitPage(): JSX.Element {
  const { filterdQuery } = useAppSelector(returnGroupRecruitFilterState);
  const [filterdGroupList, setFilterdGroupList] = useState<GroupResponse[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initFilterState());
  }, []);

  useEffect(() => {
    toggleLoadingState();
    const getGroupsList = async () => {
      const allGroupList = await groupHttpClient.getFilterdGroupList(filterdQuery);
      setFilterdGroupList(allGroupList);
      toggleLoadingState();
    };
    getGroupsList();
  }, [filterdQuery]);

  const renderGroupCards = filterdGroupList.map((groupData: GroupResponse) => {
    return <GroupCard key={groupData.id} groupContents={groupData} />;
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
  min-width: 1000px;

  grid-template-columns: repeat(3, minmax(250px, 2fr));
  grid-template-rows: repeat(auo-fit, minmax(100px, 2fr));
`;
export default GroupRecruitPage;
