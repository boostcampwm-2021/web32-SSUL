import React from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from '@hooks';
import { selectGroupDetail } from '@store/group/detailSlice';

function GroupIntrodction(): JSX.Element {
  const introducton = useAppSelector(selectGroupDetail).intro;
  return (
    <Container>
      <Content>{introducton}</Content>
    </Container>
  );
}

const Container = styled.div`
  width: 480px;
  padding: 16px;
  border: 1px solid ${(props) => props.theme.Gray6};
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
`;

const Content = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${(props) => props.theme.Gray1};
  white-space: pre;
`;

export default GroupIntrodction;
