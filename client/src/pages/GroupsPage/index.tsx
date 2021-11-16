import React from 'react';
import styled from '@emotion/styled';
import { VerticalLayout } from '@styles';
import GroupInfo from './GroupInfo';
import GroupBoard from './GroupBoard';
import SettingButton from './SettingButton';

function GroupsPage(): JSX.Element {
  return (
    <Container>
      <SettingButton />
      <GroupInfo />
      <GroupBoard />
    </Container>
  );
}

const Container = styled(VerticalLayout)`
  position: relative;
  padding: 48px;
  height: max-content;
`;

export default GroupsPage;
