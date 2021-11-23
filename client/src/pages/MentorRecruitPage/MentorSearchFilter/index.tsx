import React from 'react';
import styled from '@emotion/styled';
import TechSectionHeader from './TechSectionHeader';
import TechList from './TechList';

function MentorSearchFilter(): JSX.Element {
  return (
    <TechStackSection>
      <TechSectionHeader />
      <TechList />
    </TechStackSection>
  );
}

const TechStackSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  padding: 10px;

  background: ${(props) => props.theme.White};
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export default MentorSearchFilter;
