import React from 'react';
import styled from '@emotion/styled';

interface Props {
  title: string;
  path: string;
}

function NavItem({ title }: Props): JSX.Element {
  return <Item>{title}</Item>;
}

const Item = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
  margin: 0px 24px 0px 24px;
  color: #323232;
  font-size: 1.05em;
  box-sizing: border-box;
  cursor: pointer;
`;

export default NavItem;
