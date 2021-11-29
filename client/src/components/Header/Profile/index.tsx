import React, { useState, useEffect, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { BubbleModalProfileItem } from '@types';
import { useAppDispatch, useAppSelector, useLoader } from '@hooks';
import { authHttpClient } from '@api';
import { loginWithGithub } from '@utils/Auth';
import { initUser, selectUser } from '@store/user/globalSlice';
import { BubbleModal } from '@components';

function Profile(): JSX.Element {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [toggleLoader] = useLoader();
  const [isModalClicked, setIsModalClicked] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean>(false);

  const handleLoginMenuClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsModalClicked(false);
    loginWithGithub();
  };
  const handleProfileMenuClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsModalClicked(false);
    history.push(`/profile/${user.oAuthId}`);
  };
  const handleLogoutMenuClick = async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggleLoader(true);
    await authHttpClient.logout();
    setAuth(false);
    setIsModalClicked(false);
    toggleLoader(false);
    history.push('/');
  };
  const handleProfileButtonClick = () => setIsModalClicked(!isModalClicked);
  const handleWindowClick = () => setIsModalClicked(false);

  const noSignBubbleModalProfileItems: BubbleModalProfileItem[] = [
    { name: '로그인', handleModalItemClick: handleLoginMenuClick },
  ];
  const signBubbleModalProfileItems: BubbleModalProfileItem[] = [
    { name: '프로필', handleModalItemClick: handleProfileMenuClick },
    { name: '로그아웃', handleModalItemClick: handleLogoutMenuClick },
  ];

  useEffect(() => {
    if (!auth) dispatch(initUser());
  }, [auth]);

  useEffect(() => {
    setAuth(user.isLogin);
  }, [user]);

  useEffect(() => {
    isModalClicked
      ? window.addEventListener('click', handleWindowClick)
      : window.removeEventListener('click', handleWindowClick);

    return () => window.removeEventListener('click', handleWindowClick);
  }, [isModalClicked]);

  return (
    <Container>
      {user.isLogin ? (
        <UserImage color={user.image} onClick={handleProfileButtonClick} />
      ) : (
        <DefaultImage onClick={handleProfileButtonClick} />
      )}
      {isModalClicked && (
        <BubbleModal
          type="profile-modal"
          items={user.isLogin ? signBubbleModalProfileItems : noSignBubbleModalProfileItems}
          headerVisibility={user.isLogin}
        />
      )}
    </Container>
  );
}
const Container = styled.div`
  position: relative;
`;

const DefaultImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 70%;
  border: 0.0625rem solid #f2f2f2;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  background-size: cover;
  cursor: pointer;
  background-image: url(https://camo.githubusercontent.com/614e69129cbd90e364e863ad2de097121dd289e693e8b611a039dda08d7c3403/68747470733a2f2f692e696d6775722e636f6d2f665a346378737a2e706e67);
`;

const UserImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 70%;
  border: 0.0625rem solid #f2f2f2;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  background-size: cover;
  cursor: pointer;
  background-image: url(${(props) => props.color});
`;

export default Profile;
