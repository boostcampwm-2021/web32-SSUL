import React from 'react';
import styled from '@emotion/styled';

interface Props {
  title: string;
  children?: JSX.Element | JSX.Element[];
}
function ProfileBoxContainer({ title, children }: Props): JSX.Element {
  return (
    <Container>
      <BoxTitle>{title}</BoxTitle>
      {children}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin: 40px auto 0 auto;
  width: 650px;
  min-height: 100px;
  border-radius: 10px;
  border: 1px ${(props) => props.theme.Gray5} solid;
`;

const BoxTitle = styled.p`
  margin: 20px 0 0 20px;
  font-size: 16px;
  line-height: 30px;
`;

export default ProfileBoxContainer;
