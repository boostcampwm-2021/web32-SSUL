import React from 'react';
import styled from '@emotion/styled';

function SearchBar(): JSX.Element {
  return <Container>Saerch for...</Container>;
}

const Container = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;

  background: ${(props) => props.theme.White};
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px 30px 30px 30px;
`;

export default SearchBar;
