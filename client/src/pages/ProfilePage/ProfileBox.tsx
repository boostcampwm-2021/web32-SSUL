import React, { useState } from 'react';
import styled from '@emotion/styled';

interface Props {
  title: string;
}
function ProfileBox({ title }: Props): JSX.Element {
  const [editState, setEditState] = useState<boolean>(false);

  const handleEditButtonClick = () => {
    setEditState(!editState);
  };

  function handleEditTextResize(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const textArea: HTMLTextAreaElement = e.currentTarget;
    textArea.style.height = '1px';
    textArea.style.height = 10 + textArea.scrollHeight + 'px';
  }
  return (
    <Container>
      <BoxHeader>
        <p>{title}</p>
        <EditButton onClick={handleEditButtonClick}>{editState ? '저장' : '편집'}</EditButton>
      </BoxHeader>
      {editState ? <ProfileEditText onKeyDown={handleEditTextResize} /> : <ProfileText />}
    </Container>
  );
}

const Container = styled.div`
  margin: 40px auto;
  width: 650px;
  min-height: 100px;
  border-radius: 10px;
  border: 2px ${(props) => props.theme.Gray5} solid;
`;

const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 20px 0 20px;
`;

const ProfileText = styled.p`
  width: 600px;
  min-height: 40px;
  margin: 20px;
  word-break: break-all;
  font-size: 14px;
`;

const ProfileEditText = styled.textarea`
  width: 600px;
  margin: 20px;
  font-size: 14px;
  resize: none;
  border: 1px ${(props) => props.theme.Primary} solid;
  border-radius: 5px;
  &:focus {
    outline: 2px ${(props) => props.theme.Primary} solid;
  }
`;
const EditButton = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
`;
export default ProfileBox;
