import React, { useState } from 'react';
import styled from '@emotion/styled';
import { MentorCard, Pagination } from '@components';
import { createdFilterdQuery } from '@store/mentor/filterSlice';
import { Mentor } from '@types';
import { dummyData } from './dummyData';

console.log(dummyData);
function MentorCardList(): JSX.Element {
  const [filterdMentorList, setFilterdMentorList] = useState<Mentor[]>([]);
  const renderMentorCards = dummyData.map((mentorData: Mentor) => {
    return <MentorCard key={mentorData.id} contents={mentorData} />;
  });

  return (
    <>
      <CardList>{renderMentorCards}</CardList>

      <Pagination totalPages={100} curPage={1} createdQuery={createdFilterdQuery} />
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
