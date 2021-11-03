import React from 'react';
import styled from '@emotion/styled';

interface BubbleModalItem {
  name: string;
  onClick(e: React.MouseEvent<HTMLDivElement>): void;
}

function MenuItem({ name, onClick }: BubbleModalItem): JSX.Element {
  return (
    <Item onClick={onClick}>
      <Name>{name}</Name>
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0px 24px 0px 24px;
  font-size: 0.9em;
  color: ${(props) => props.theme.Gray3};
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.Gray6};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.Primary};
  }
`;

const Name = styled.span`
  font-weight: 600;
`;

export default MenuItem;
