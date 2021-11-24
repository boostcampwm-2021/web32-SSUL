import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

function TechList(): JSX.Element {
  return (
    <Container>
      <SelectedTechListItem>item</SelectedTechListItem>
      <NonSelectedTechListItem>item2</NonSelectedTechListItem>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: auto 10px;

  grid-template-rows: repeat(auto-fill);

  background: ${(props) => props.theme.White};

  border-radius: 10px;
`;

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const TechListItem = styled.button`
  display: flex;
  margin: 5px 5px;
  padding: 0px 10px;

  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);

  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

const SelectedTechListItem = styled(TechListItem)`
  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
`;

const NonSelectedTechListItem = styled(TechListItem)`
  color: ${(props) => props.theme.Gray3};
  background: ${(props) => props.theme.Gray6};
  &.shake {
    animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
`;

export default TechList;
