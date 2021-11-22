import React from 'react';
import styled from '@emotion/styled';
import GroupInfoEditBox from './GroupInfoEditBox';
import ParticipationRequestBox from './ParticipationRequestBox';

function GroupOwnerPage(): JSX.Element {
  return (
    <Container>
      <GroupInfoEditBox />
      <ParticipationRequestBox/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px auto;
  width: 1100px;
`;

export default GroupOwnerPage;
