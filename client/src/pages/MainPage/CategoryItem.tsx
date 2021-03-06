import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  name: string;
  url: string;
}
export default function CategoryItem({ id, name, url }: Props): JSX.Element {
  return (
    <LinkButton
      to={{
        pathname: `/recruit/group`,
        state: {
          id,
        },
      }}
    >
      <CategoryIcon src={url} alt={name} />
      <CategoryName>{name}</CategoryName>
    </LinkButton>
  );
}

const LinkButton = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.TextColor};
  &:hover {
    color: ${({ theme }) => theme.Primary};
  }
`;

const CategoryIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
  filter: ${({ theme }) => theme.Filter};
  &:hover {
    filter: ${({ theme }) => theme.ColorFilter};
  }
`;

const CategoryName = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
`;
