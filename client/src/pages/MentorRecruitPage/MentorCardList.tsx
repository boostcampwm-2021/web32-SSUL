import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { MentorCard, Pagination } from '@components';
import {
  createdFilterdQuery,
  returnMentorRecruitFilterState,
  initFilterState,
} from '@store/mentor/filterSlice';
import { Mentor, MentorListResponse } from '@types';
import { useAppDispatch, useAppSelector, useLoader } from '@hooks';
import { mentoringHttpClient } from '@api';

function MentorCardList(): JSX.Element {
  const { filterdQuery, selectedPage } = useAppSelector(returnMentorRecruitFilterState);
  const [filterdMentorList, setFilterdMentorList] = useState<Mentor[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [toggleLoader] = useLoader();

  useEffect(() => {
    dispatch(initFilterState());
  }, []);

  useEffect(() => {
    toggleLoader(true);
    (async () => {
      const allMentorList: MentorListResponse = await mentoringHttpClient.getFilterdMentorList(
        filterdQuery,
      );
      setFilterdMentorList(allMentorList.mentors);
      setTotalPages(allMentorList.totalPages);
      toggleLoader(false);
    })();
  }, [filterdQuery]);

  const renderMentorCards = filterdMentorList.map((mentorData: Mentor) => {
    return <MentorCard key={mentorData.id} contents={mentorData} />;
  });

  return (
    <>
      <CardList>{renderMentorCards}</CardList>
      <Pagination
        totalPages={totalPages}
        curPage={selectedPage}
        createdQuery={createdFilterdQuery}
      />
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

export default MentorCardList;
