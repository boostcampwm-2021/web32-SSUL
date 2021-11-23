import React from 'react';
import styled from '@emotion/styled';

function SelectedTechList(): JSX.Element {
  return (
    <Container>
      <SelectItem>
        <TechStackName>TechStack</TechStackName>
        <EraseButton>X</EraseButton>
      </SelectItem>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 15px;
`;

const SelectItem = styled.div`
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
  box-shadow: 2px 2px 4px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
`;

const TechStackName = styled.span`
  align-self: center;
`;

const EraseButton = styled.button`
  margin-left: 10px;
  background: ${(props) => props.theme.Primary};
  border: 10px;
  border: none;
  outline: none;
  cursor: pointer;
`;

export default SelectedTechList;
