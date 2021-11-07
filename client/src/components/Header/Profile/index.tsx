import React, { useState, useEffect, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import styled from '@emotion/styled';
import BubbleModal from '../../BubbleModal';
import { BubbleModalProfileItem } from '../../../types/Modal';
import { loginWithGithub } from '@utils/Auth';
import { selectUser } from '../../../store/slices/userSlice';

function Profile(): JSX.Element {
  const history = useHistory();
  const user = useAppSelector(selectUser);
  console.log(user);
  const [isModalClicked, setIsModalClicked] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleLoginMenuClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsLogin(true);
    setIsModalClicked(false);
    loginWithGithub();
  };
  const handleProfileMenuClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsModalClicked(false);
    history.push('/profile/ssuler'); // 임시 유저 닉네임
  };
  const handleLogoutMenuClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsLogin(false);
    setIsModalClicked(false);
    history.push('/');
  };
  const handleProfileButtonClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsModalClicked(!isModalClicked);
  };
  const handleWindowClick = () => setIsModalClicked(false);

  const noSignBubbleModalProfileItems: BubbleModalProfileItem[] = [
    { name: '로그인', handleModalItemClick: handleLoginMenuClick },
  ];
  const signBubbleModalProfileItems: BubbleModalProfileItem[] = [
    { name: '프로필', handleModalItemClick: handleProfileMenuClick },
    { name: '로그아웃', handleModalItemClick: handleLogoutMenuClick },
  ];

  useEffect(() => {
    isModalClicked
      ? window.addEventListener('click', handleWindowClick)
      : window.removeEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  }, [isModalClicked]);

  return (
    <Container>
      <Image onClick={handleProfileButtonClick} />
      {isModalClicked && (
        <BubbleModal
          type="profile-modal"
          items={isLogin ? signBubbleModalProfileItems : noSignBubbleModalProfileItems}
          headerVisibility={isLogin}
        />
      )}
    </Container>
  );
}
const Container = styled.div`
  position: relative;
`;

const Image = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 70%;
  border: 0.0625rem solid #f2f2f2;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  background-image: url(https://camo.githubusercontent.com/614e69129cbd90e364e863ad2de097121dd289e693e8b611a039dda08d7c3403/68747470733a2f2f692e696d6775722e636f6d2f665a346378737a2e706e67);
  background-size: cover;
  cursor: pointer;
`;

export default Profile;
