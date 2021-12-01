import React from 'react';
import styled from '@emotion/styled';
import WarningLogo from '@assets/icon_warning.svg';
import { DESC_NOT_FOUND, MSG_NOT_FOUND } from '@constants/consts';

interface Props {
  description?: string;
  message?: string;
}

function ExceptionPage({
  description = DESC_NOT_FOUND,
  message = MSG_NOT_FOUND,
}: Props): JSX.Element {
  return (
    <Container>
      <WarningImage src={WarningLogo} alt="경고 로고 이미지"></WarningImage>
      <WarningTextBox>
        <WarningCode>{description}</WarningCode>
        <WarningText>{message}</WarningText>
      </WarningTextBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 100px;
`;

const WarningImage = styled.img`
  width: 320px;
`;

const WarningTextBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 80px;
`;

const WarningCode = styled.span`
  position: absolute;
  width: fit-content;
  top: -60px;
  font-size: 2.35rem;
  font-weight: 500;
  color: ${(props) => props.theme.Primary};
`;

const WarningText = styled.span`
  position: absolute;
  top: -14px;
  width: fit-content;
  font-size: 2.75rem;
  font-weight: 700;
  color: ${(props) => props.theme.Primary};
`;

export default ExceptionPage;
