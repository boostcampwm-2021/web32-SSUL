import React from 'react';
import styled from '@emotion/styled';
import { useAppSelector, useAppDispatch } from '@hooks';
import { toggleTheme, selectTheme } from '@store/util/Slice';

function ThemeSwitch(): JSX.Element {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectTheme);

  const handleSwitchButtonClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <Container onClick={handleSwitchButtonClick}>
      <Range />
      <Button mode={mode} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 48px;
  height: 24px;
  border-radius: 24px;
  padding: 4px 8px 4px 8px;
  margin: 0px 24px 0px 24px;
  border: 1.5px solid ${({ theme }) => theme.Gray5};
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.Shadow};
  background-color: ${({ theme }) => theme.Background};
  cursor: pointer;
`;

const Range = styled.div`
  position: absolute;
  width: 32px;
  height: 12px;
  background-color: ${({ theme }) => theme.Gray4};
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.Gray5};
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.Shadow};
  transition: all 0.75s ease-in;
`;

const Button = styled.div<{ mode: string }>`
  position: absolute;
  left: ${({ mode }) => (mode === 'light' ? '15%' : '55%')};
  width: 16px;
  height: 16px;
  background-color: ${(props) => props.theme.Primary};
  border-radius: 24px;
  box-sizing: border-box;
  z-index: 999;
  box-shadow: ${(props) => props.theme.Shadow};
  transition: left 0.5s ease-in;
`;

export default ThemeSwitch;
