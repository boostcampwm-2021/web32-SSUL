import React from 'react';
import styled from '@emotion/styled';
import GroupCardHeader from './GroupCardHeader';
import GroupCardStatus from './GroupCardStatus';
import GroupApplyButton from './GroupApplyButton';

function GroupCard(): JSX.Element {
  return (
    <Card>
      <GroupCardHeader />
      <GroupCardStatus />
      <GroupApplyButton />
    </Card>
  );
}

const Card = styled.div`
  display: flex;
`;

export default GroupCard;
