import React from 'react';
import styled from '@emotion/styled';
import { VerticalLayout } from '@styles';
import GroupInfo from './GroupInfo';
import GroupBoard from './GroupBoard';
import SettingButton from './SettingButton';
import GroupPageModal from './Modal';
import { useAppSelector } from '@hooks';
import { selectGroupModalState } from '@store/util/Slice';

function GroupsPage(): JSX.Element {
  const modalType = useAppSelector(selectGroupModalState);

  return (
    <Container>
      <SettingButton />
      <GroupInfo />
      <GroupBoard />
      <GroupPageModal type={modalType} />
    </Container>
  );
}

const Container = styled(VerticalLayout)`
  position: relative;
  padding: 48px;
  height: max-content;
`;

export default GroupsPage;
