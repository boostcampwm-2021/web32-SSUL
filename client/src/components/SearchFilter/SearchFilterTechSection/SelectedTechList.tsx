import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import { popSelectedTechStack } from '../../../store/slices/selectedTechStack';

function SelectedTechList(): JSX.Element {
  const selectedTechList = useSelector<ReducerType, string[]>((state) => state.selectedTechStack);
  const selectedTechStackDispatch = useDispatch();

  const handleEraseButtonClick = (e: any) => {
    const nowTechStack = e.currentTarget.previousSibling.innerHTML;
    selectedTechStackDispatch(popSelectedTechStack(nowTechStack));
  };

  const totalSelectedTechList = selectedTechList.map((category, idx) => {
    return (
      <SelectItem key={idx}>
        <h4>{category}</h4>
        <EraseButton onClick={handleEraseButtonClick}>X</EraseButton>
      </SelectItem>
    );
  });

  return <Container>{totalSelectedTechList}</Container>;
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
  cursor: pointer;
`;

export default SelectedTechList;
