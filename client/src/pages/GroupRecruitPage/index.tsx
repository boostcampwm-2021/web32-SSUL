import React from 'react';
import styled from '@emotion/styled';
import { SearchFilter } from '@components';
import GroupCardList from './GroupCardList';

function GroupRecruitPage(): JSX.Element {
  return (
    <Container>
      <SearchFilter />
      <GroupCardList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
`;

export default GroupRecruitPage;
