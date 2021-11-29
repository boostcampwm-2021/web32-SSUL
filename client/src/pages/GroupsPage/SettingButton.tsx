import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@hooks';
import { selectGroupDetail } from '@store/group/detailSlice';
import SettingIcon from '@assets/icon_setting.png';

function SettingButton(): JSX.Element {
  const groupDetail = useAppSelector(selectGroupDetail);

  return (
    <Container>
      <Link to={`/group/owner/${groupDetail.id}`}>
        <Image src={SettingIcon} alt="세팅 아이콘" />
      </Link>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 70px;
  left: calc(50% + 480px);
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
