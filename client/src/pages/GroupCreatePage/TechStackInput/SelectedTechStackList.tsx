import React from 'react';
import styled from '@emotion/styled';

interface Props {
  usingTechStacks: string[];
  setUsingTechStacks: (newTechStacks: string[]) => void;
}

function SelectedTechStackList({ usingTechStacks, setUsingTechStacks }: Props): JSX.Element {

  const handleEraseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetTechStack = e.currentTarget as HTMLButtonElement;
    const nowTechStack = targetTechStack.previousElementSibling?.innerHTML;
    const newSelectedTechStack = usingTechStacks.filter((techStackName) => {
      return techStackName !== nowTechStack;
    });
    setUsingTechStacks(newSelectedTechStack);
  };
  const selectedTechListElements = usingTechStacks.map((techStackName, idx) => {
    return (
      <SelectItem key={idx}>
        <ItemText>{techStackName}</ItemText>
        <EraseButton data-test="erase-button" onClick={handleEraseButtonClick}>X</EraseButton>
      </SelectItem>
    );
  });

  return <Container>{selectedTechListElements}</Container>;
}

const Container = styled.div`
  display: flex;
`;

const SelectItem = styled.div`
  display: flex;
  margin: 10px;
  padding: 8px;

  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
  box-shadow: 4px 4px 10px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
`;

const ItemText = styled.p`
  margin: 0;
  color: ${(props) => props.theme.White};
  font-weight: bold;
`
const EraseButton = styled.button`
  margin-left: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default SelectedTechStackList;
