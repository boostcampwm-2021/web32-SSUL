import React from 'react';
import styled from '@emotion/styled';
import NavItem from './NavItem';

interface NavigationItem {
  title: string;
  path: string;
}

function NavItemList(): JSX.Element {
  const navItemList: NavigationItem[] = [
    { title: '그룹 탐색', path: '/recruit/group' },
    { title: '멘토 찾기', path: '/recruit/mentor' },
    { title: '참여 그룹', path: '/group/my' },
  ];

  const navItems = navItemList.map((item, idx) => {
    return <NavItem title={item.title} path={item.path} key={idx} />;
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
