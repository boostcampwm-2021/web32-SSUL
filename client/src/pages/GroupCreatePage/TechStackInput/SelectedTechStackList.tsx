import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '@store/rootReducer';
import { GroupData } from '../../../types/CreateGroup';
import { setGroupData } from '@store/slices/createGroupData';

function SelectedTechStackList(): JSX.Element {
  const { selectedTechStack } = useSelector<ReducerType, GroupData>(
    (state) => state.createGroupData,
  );
  const dispatch = useDispatch();

  const handleEraseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetTechStack = e.currentTarget as HTMLButtonElement;
    const nowTechStack = targetTechStack.previousElementSibling?.innerHTML;
    const newSelectedTechStack = selectedTechStack.filter((techStackName) => {
      return techStackName !== nowTechStack;
    });

    dispatch(setGroupData({ selectedTechStack: newSelectedTechStack }));
  };
  const selectedTechListElements = selectedTechStack.map((techStackName, idx) => {
    return (
      <SelectItem key={idx}>
        <h4>{techStackName}</h4>
        <EraseButton onClick={handleEraseButtonClick}>X</EraseButton>
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

const EraseButton = styled.button`
  margin-left: 10px;

  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px 30px 30px 30px;
  cursor: pointer;
`;

export default SelectedTechStackList;
