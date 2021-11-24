import React from 'react';
import styled from '@emotion/styled';
import { MentorCard, Pagination } from '@components';
import { createdFilterdQuery } from '@store/mentor/filterSlice';

function MentorCardList(): JSX.Element {
  return (
    <>
      <CardList>
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
      </CardList>
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
