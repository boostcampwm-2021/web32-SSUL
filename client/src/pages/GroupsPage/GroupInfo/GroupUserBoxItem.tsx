import React from 'react';
import styled from '@emotion/styled';
import { GroupEnrollment } from '@types';

interface Props {
  user: GroupEnrollment;
}
function GroupUserBoxItem({ user }: Props): JSX.Element {
  const makeBadgeByRole = (role: string): string => {
    switch (role) {
      case 'OWNER':
        return '👑';
      case 'MENTOR':
        return '💡';
      default:
        return '';
    }
  };
  return (
    <Container>
      <Image url={user.avatarUrl} />
      <Name>{`${user.name} ${makeBadgeByRole(user.type)}`}</Name>
    </Container>
  );
}

const Container = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

type ImageProps = {
  url: string;
};

const Image = styled.div<ImageProps>`
  width: 48px;
  height: 48px;
  border-radius: 70%;
  border: 0.0625rem solid '#f2f2f2';
  overflow: hidden;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  background-size: cover;
  cursor: pointer;
  background-image: url(${(props) => props.url});
`;
const Name = styled.span`
  width: 100%;
  font-size: 0.625rem;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.theme.Gray1};
  overflow: hidden;
`;

export default GroupUserBoxItem;
