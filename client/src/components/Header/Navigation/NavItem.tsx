import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  path: string;
}

function NavItem({ title, path }: Props): JSX.Element {
  return <Item to={path}>{title}</Item>;
}

const Item = styled(Link)`
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
