import React from 'react';
import styled from '@emotion/styled';
import { VerticalLayout } from '@styles';
import GroupInfo from './GroupInfo';
import GroupBoard from './GroupInfo';
import SettingButton from './SettingButton';

function GroupsPage(): JSX.Element {
  return (
    <VerticalLayout>
      <SettingButton />
      <GroupInfo />
      <GroupBoard />
    </VerticalLayout>
  );
}

const Container = styled.div``;

export default GroupsPage;
