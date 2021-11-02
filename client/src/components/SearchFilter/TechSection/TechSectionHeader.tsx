import React from 'react';
import styled from '@emotion/styled';
import SearchBar from './SearchBar';
import SelectedTechList from './SelectedTechList';

function TechSectionHeader(): JSX.Element {
  return (
    <Container>
      <SearchBar />
      <SelectedTechList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

export default TechSectionHeader;
