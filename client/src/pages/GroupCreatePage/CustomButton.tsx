import React from 'react';
import styled from '@emotion/styled';

interface BtnProps {
  label: string;
  color: string;
  backgroundColor: string;
  clickBtn: () => void;
}

function CustomButton({ label, color, backgroundColor, clickBtn }: BtnProps): JSX.Element {
  const style = {
    backgroundColor: backgroundColor,
    color: color,
  };
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
  margin-right: 40px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0px 5px 7px #8f8f8f, -5px -5px 10px #ffffff;
  &:active {
    box-shadow: inset 5px 5px 10px #8f8f8f, inset -5px -5px 10px #ffffff;
  }
`;

export default CustomButton;
