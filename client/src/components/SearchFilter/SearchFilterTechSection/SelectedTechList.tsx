import React from 'react';
import styled from '@emotion/styled';

const dummyData = ['express', 'react', 'node.js', 'test'];

function SelectedTechList(): JSX.Element {
  const selectedTechList = dummyData.map((category, idx) => {
    return (
      <SelectItem key={idx}>
        <h4>{category}</h4>
        <EraseButton>X</EraseButton>
      </SelectItem>
    );
  });

  return <Container>{selectedTechList}</Container>;
}

const Container = styled.div`
  display: flex;
`;

const SelectItem = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;

  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
  box-shadow: 4px 4px 10px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
`;

const EraseButton = styled.button`
  margin-left: 10px;

  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px 30px 30px 30px;
`;

export default SelectedTechList;
