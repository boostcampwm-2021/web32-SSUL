import React from 'react';
import styled from '@emotion/styled';
import { MentorCard } from '@components';

function MentorCardList(): JSX.Element {
  return (
    <>
      <CardList>
        <MentorCard />
        <MentorCard />
        <MentorCard />
        <MentorCard />
      </CardList>
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
