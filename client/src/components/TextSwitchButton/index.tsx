import React, { useState } from 'react';
import styled from '@emotion/styled';
import { LeftOrRight } from '@constants/enums';

interface Props {
  leftText: string;
  rightText: string;
  defaultSide: LeftOrRight;
  onLeftClick: () => void;
  onRightClick: () => void;
}

function TextSwitchButton({
  leftText,
  rightText,
  defaultSide,
  onLeftClick,
  onRightClick,
}: Props): JSX.Element {
  const [selected, setSelected] = useState<LeftOrRight>(defaultSide);

  const handleLeftButtonClick = () => {
    onLeftClick();
    setSelected(LeftOrRight.LEFT);
  };

  const handleRightButtonClick = () => {
    onRightClick();
    setSelected(LeftOrRight.RIGHT);
  };

  return (
    <Container>
      <TextButton selected={LeftOrRight.LEFT === selected} onClick={handleLeftButtonClick}>
        {leftText}
      </TextButton>
      <TextButton selected={LeftOrRight.RIGHT === selected} onClick={handleRightButtonClick}>
        {rightText}
      </TextButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 300px;
  height: 40px;
  border: 1px ${(props) => props.theme.Primary} solid;
  border-radius: 16px;
`;

const TextButton = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${(props) => (props.selected ? props.theme.White : props.theme.Primary)};
  background-color: ${(props) => (props.selected ? props.theme.Primary : props.theme.White)};
  border-radius: 16px;
  cursor: pointer;
`;
export default TextSwitchButton;
