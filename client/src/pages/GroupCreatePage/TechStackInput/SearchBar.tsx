import React from 'react';
import styled from '@emotion/styled';

interface Props {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}
function SearchBar({ onChange }: Props): JSX.Element {
  return (
    <Container>
      <InputValue data-test="search-bar" onChange={onChange} placeholder="Search for.." />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  width: 200px;

  background: ${(props) => props.theme.White};
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px 30px 30px 30px;
`;

const InputValue = styled.input`
  display: flex;
  border: none;
  &:focus {
    outline: none;
  }
`;

export default SearchBar;
