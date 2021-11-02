import React from 'react';
import styled from '@emotion/styled';
import SearchFilter from '../../components/SearchFilter/SearchFilter';

function GroupRecruitPage(): JSX.Element {
  return (
    <Container>
      <SearchFilter />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

export default GroupRecruitPage;
