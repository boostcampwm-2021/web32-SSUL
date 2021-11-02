import React from 'react';
import styled from '@emotion/styled';

const dummyData = ['express', 'react', 'node.js', 'test'];

function TechList(): JSX.Element {
  return (
    <Container>
      {dummyData.map((category, idx) => {
        return <TechListItem key={idx}>{category}</TechListItem>;
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const TechListItem = styled.div`
  display: flex;
`;

export default TechList;
