import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { GroupEnrollment } from '@types';
import { GroupEnrollmentState } from '@constants/enums';

interface Props {
  user: GroupEnrollment;
}

const makeBadgeByRole = (role: string): string => {
  switch (role) {
    case GroupEnrollmentState.OWNER:
      return '👑';
    case GroupEnrollmentState.MENTOR:
      return '💡';
    default:
      return '';
  }
};

function GroupUserBoxItem({ user }: Props): JSX.Element {
  return (
    <Container>
      <Link to={`/profile/${user.githubId}`}>
        <Image url={user.avatarUrl} />
      </Link>
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
  box-shadow: ${(props) => props.theme.Shadow};
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
