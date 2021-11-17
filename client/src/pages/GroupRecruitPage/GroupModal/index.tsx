import React from 'react';
import styled from '@emotion/styled';
import { GroupDetail } from '@types';

interface Props {
  contents: GroupDetail;
}

function GroupModal({ contents }: Props): JSX.Element {
  return <Container>{JSON.stringify(contents)}</Container>;
}

const Container = styled.div``;

export default GroupModal;
