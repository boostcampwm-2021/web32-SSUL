import React from 'react';
import styled from '@emotion/styled';
import { userHttpClient } from '@api';
import { useAppSelector, useAppDispatch } from '@hooks';
import { selectUserRole, changeUserRole } from '@store/user/globalSlice';

function RoleSwitch(): JSX.Element {
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectUserRole);

  const handleSwitchButtonClick = () => {
    userHttpClient.patchRole();
    dispatch(changeUserRole());
  };

  return (
    <Container onClick={handleSwitchButtonClick}>
      <Range role={role} />
      <Button role={role} />
    </Container>
  );
}

interface StyledProps {
  role: string;
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 48px;
  height: 24px;
  border-radius: 24px;
  padding: 4px 8px 4px 8px;
  margin: 0px 24px 0px 24px;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.Shadow};
  cursor: pointer;
`;

const Range = styled.div`
  position: absolute;
  width: 32px;
  height: 12px;
  background-color: ${(props: StyledProps) => (props.role === 'MENTEE' ? '#F2F2F2' : '#BDBDBD')};
  border-radius: 24px;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.Shadow};
  transition: all 0.75s ease-in;
`;

const Button = styled.div`
  position: absolute;
  left: ${(props: StyledProps) => (props.role === 'MENTEE' ? '15%' : '55%')};
  width: 16px;
  height: 16px;
  background-color: ${(props) => props.theme.Primary};
  border-radius: 24px;
  box-sizing: border-box;
  z-index: 999;
  box-shadow: ${(props) => props.theme.Shadow};
  transition: left 0.5s ease-in;
`;

export default RoleSwitch;
