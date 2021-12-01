import React from 'react';
import styled from '@emotion/styled';
import NavItem from './NavItem';
import { useAppSelector } from '@hooks';
import { selectUser } from '@store/user/globalSlice';

interface NavigationItem {
  title: string;
  path: string;
  auth: boolean;
}

const navItemList: NavigationItem[] = [
  { title: '그룹 찾기', path: '/recruit/group', auth: false },
  { title: '멘토 찾기', path: '/recruit/mentor', auth: false },
  { title: '참여 그룹', path: '/group/my', auth: true },
];

function NavItemList(): JSX.Element {
  const { isLogin } = useAppSelector(selectUser);

  const navItems = navItemList.map((item, idx) => {
    if (isLogin || !item.auth) return <NavItem title={item.title} path={item.path} key={idx} />;
  });

  return <Container>{navItems}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 640px;
  box-sizing: border-box;
`;

export default NavItemList;
