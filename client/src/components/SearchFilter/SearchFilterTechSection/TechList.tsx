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
  margin: 10px;

  background: ${(props) => props.theme.White};
  box-shadow: 5px 5px 25px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
`;

const TechListItem = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;

  background: ${(props) => props.theme.White};
  box-shadow: 5px 5px 25px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
`;

export default TechList;
