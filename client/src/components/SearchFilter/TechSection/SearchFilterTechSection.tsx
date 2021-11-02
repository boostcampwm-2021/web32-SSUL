import React from 'react';
import styled from '@emotion/styled';
import TechSectionHeader from './TechSectionHeader';
import TechList from './TechList';

function SearchFilterTechSection(): JSX.Element {
  return (
    <Container>
      <TechSectionHeader />
      <TechList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default SearchFilterTechSection;
