import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { GroupCard, Pagination } from '@components';
import { Group, GroupResponse } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  initFilterState,
  returnGroupRecruitFilterState,
} from '@store/slices/groupRecruitFilterSlice';
import { groupHttpClient } from '@api';
import { toggleLoadingState } from '@store/slices/utilSlice';

function GroupCardList(): JSX.Element {
  const { filterdQuery, selectedPage } = useAppSelector(returnGroupRecruitFilterState);
  const [filterdGroupList, setFilterdGroupList] = useState<Group[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initFilterState());
  }, []);

  useEffect(() => {
    toggleLoadingState();
    const getGroupsList = async () => {
      const allGroupList: GroupResponse = await groupHttpClient.getFilterdGroupList(filterdQuery);
      setFilterdGroupList(allGroupList.groups);
      setTotalPages(allGroupList.totalPages);
      toggleLoadingState();
    };
    getGroupsList();
  }, [filterdQuery]);

  const renderGroupCards = filterdGroupList.map((groupData: Group) => {
    return <GroupCard key={groupData.id} groupContents={groupData} />;
  });

  return (
    <>
      <CardList>{renderGroupCards}</CardList>
      <Pagination totalPages={totalPages} curPage={selectedPage} />
    </>
  );
}

const CardList = styled.div`
  display: grid;
  margin: 10px auto;
  min-width: 1000px;

  grid-template-columns: repeat(3, minmax(250px, 2fr));
  grid-template-rows: repeat(auo-fit, minmax(100px, 2fr));
`;

export default GroupCardList;
