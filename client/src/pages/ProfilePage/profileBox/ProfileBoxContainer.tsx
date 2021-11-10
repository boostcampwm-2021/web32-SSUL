import React from 'react';
import styled from '@emotion/styled';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
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
  border: 1px ${(props) => props.theme.White} solid;
  box-shadow: inset 0px 0px 4px rgb(0 0 0 / 25%);
`;

const BoxTitle = styled.p`
  margin: 20px 0 0 20px;
  line-height: 30px;
`;

export default ProfileBoxContainer;
