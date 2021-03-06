import React from 'react';
import styled from '@emotion/styled';
import SearchFilterHeader from './SearchFilterHeader';
import SearchFilterTechSection from './SearchFilterTechSection';

function SearchFilter(): JSX.Element {
  return (
    <Container>
      <SearchFilterHeader />
      <SearchFilterTechSection />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default SearchFilter;
