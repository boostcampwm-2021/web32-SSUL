import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import SettingIcon from '@assets/icon_setting.png';

function SettingButton(): JSX.Element {
  return (
    <Container>
      <Link to="/group/owner/:id">
        <Image src={SettingIcon} alt="세팅 아이콘" />
      </Link>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 62px;
  right: 15.5%;
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
  filter: invert(17%) sepia(7%) saturate(21%) hue-rotate(353deg) brightness(104%) contrast(94%);
  &:hover {
    filter: invert(56%) sepia(94%) saturate(1898%) hue-rotate(130deg) brightness(95%) contrast(101%);
    transition: 0.3s ease;
  }
`;

export default SettingButton;
