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
  width: 80vw;
  padding: 10px;

  background: ${(props) => props.theme.White};
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export default SearchFilterTechSection;
