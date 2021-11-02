import React from 'react';
import styled from '@emotion/styled';
import ColorLogoImage from '../../assets/logo_title.png';

function Logo(): JSX.Element {
  return <Image src={ColorLogoImage} alt="메인 헤더 로고" />;
}

const Image = styled.img`
  height: 24px;
  margin: 0px 24px 0px 24px;
`;

export default Logo;
