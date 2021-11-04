import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import ColorLogoImage from '../../assets/logo_title.png';

function Logo(): JSX.Element {
  return (
    <Link to="/">
      <Image src={ColorLogoImage} alt="메인 헤더 로고" />
    </Link>
  );
}

const Image = styled.img`
  height: 28px;
  margin: 0px 24px 0px 24px;
`;

export default Logo;
