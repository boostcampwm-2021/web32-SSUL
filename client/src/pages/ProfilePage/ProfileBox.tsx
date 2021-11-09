import React from 'react';
import styled from '@emotion/styled';

interface Props {
  title: string;
}
function ProfileBox({ title }: Props): JSX.Element {
  return (
    <Container>
      <BoxHeader>
        <p>{title}</p>
        <EditButton>편집</EditButton>
      </BoxHeader>
      <ProfileText></ProfileText>
    </Container>
  );
}

const Container = styled.div`
  margin: 40px auto;
  width: 650px;
  min-height: 100px;
  border-radius: 10px;
  border: 2px ${(props) => props.theme.Gray5} solid;
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 20px 0 20px;
`;
const ProfileText = styled.p`
  width: 600px;
  padding: 25px;
  word-break: break-all;
  font-size: 14px;
  text-align: left;
`;

const EditButton = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
`;
export default ProfileBox;
