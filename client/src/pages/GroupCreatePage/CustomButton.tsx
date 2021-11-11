import React from 'react';
import styled from '@emotion/styled';

interface Style {
  color?: string;
  backgroundColor?: string;
  margin?: string;
}
interface BtnProps {
  style?: Style;
  label: string;
  clickBtn: () => void;
}

function CustomButton({ label, style, clickBtn }: BtnProps): JSX.Element {
  return (
    <Button style={style} onClick={clickBtn}>
      {label}
    </Button>
  );
}

const Button = styled.button`
  border: none;
  outline: none;
  width: 80px;
  height: 40px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0px 5px 7px #8f8f8f, -5px -5px 10px #ffffff;
  &:active {
    box-shadow: inset 5px 5px 10px #8f8f8f, inset -5px -5px 10px #ffffff;
  }
`;

export default CustomButton;
