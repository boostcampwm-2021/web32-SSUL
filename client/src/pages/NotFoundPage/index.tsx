import React from 'react';
import styled from '@emotion/styled';
import WarningLogo from '@assets/icon_warning.svg';

function NotFoundPage(): JSX.Element {
  return (
    <Container>
      <WarningImage src={WarningLogo}></WarningImage>
      <WarningTextBox>
        <WarningCode>404 NOT FOUND</WarningCode>
        <WarningText>없는 페이지입니다</WarningText>
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

export default NotFoundPage;
