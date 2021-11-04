import styled from '@emotion/styled';
import React from 'react';

function GroupInfo(): JSX.Element {
  return(
    <>
      <Title>간단한 그룹소개를 해주세요.</Title>
      <InfoText/>
    </>
  )
}

const Title = styled.p`
  margin: 30px;
`;

const InfoText = styled.textarea`
  border: none;
  padding: 20px;
  width: 400px;
  height: 150px;
  resize: none;
  border-radius: 10px;
  box-shadow:  5px 5px 10px #8f8f8f,
    -5px -5px 10px #ffffff;
  &:focus{
    outline: none;
  }
`
export default GroupInfo;
