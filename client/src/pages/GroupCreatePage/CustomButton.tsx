import React from 'react';
import styled from '@emotion/styled';

interface BtnProps {
  label: string;
  clickBtn: () => void;
}

const COLORED_BUTTON = {
  color: '#FFFFFF',
  backgroundColor: '#00C5AA',
};

const WHITE_BUTTON = {
  color: '#00C5AA',
  backgroundColor: '#FFFFFF',
};

function CustomButton({ label, clickBtn }: BtnProps): JSX.Element {
  const getStyle = () => { 
    switch(label){
      case '이전' :
        return WHITE_BUTTON;
      case '취소' :
          return WHITE_BUTTON;
      default :
        return COLORED_BUTTON;
    }
  }

  return (
    <Button style={getStyle()} onClick={clickBtn}>
      {label}
    </Button>
  );
}

const Button = styled.button`
  cursor: pointer;
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
