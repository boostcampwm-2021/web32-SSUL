import React from 'react';
import styled from '@emotion/styled';
function ParticipationRequestBox(): JSX.Element {
  return (
    <Container>그룹참가 요청 리스트</Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 400px;
  border: 1px ${(props) => props.theme.Gray5} solid;
  border-radius: 5px;
`;

export default ParticipationRequestBox;
