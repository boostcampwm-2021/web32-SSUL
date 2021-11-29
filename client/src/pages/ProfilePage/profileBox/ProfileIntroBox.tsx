import React, { useState } from 'react';
import styled from '@emotion/styled';
import ProfileContainer from './ProfileBoxContainer';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectProfileData, setProfileData } from '@store/user/profileSlice';
import { userHttpClient } from '@api';
import { selectUser } from '@store/user/globalSlice';
import { IntroUpdateDto } from '@types';

function ProfileIntroBox(): JSX.Element {
  const { intro } = useAppSelector(selectProfileData);
  const user = useAppSelector(selectUser);
  const profile = useAppSelector(selectProfileData);
  const dispatch = useAppDispatch();
  const [prevIntro, setPrevIntro] = useState<string>('');
  const [editState, setEditState] = useState<boolean>(false);

  const handleEditButtonClick = async () => {
    if (editState === true && prevIntro !== intro) {
      const updateIntroBody: IntroUpdateDto = {
        id: user.id as number,
        intro: intro,
      };
      setPrevIntro(intro);
      userHttpClient.patchIntro(updateIntroBody);
    }
    setEditState(!editState);
  };

  const handleEditTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.currentTarget.value;
    dispatch(setProfileData({ intro: newText }));
  };

  const handleEditTextResize = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textArea: HTMLTextAreaElement = e.currentTarget;
    textArea.style.height = '1px';
    textArea.style.height = 10 + textArea.scrollHeight + 'px';
  };

  const getTextElement = (): JSX.Element => {
    return editState ? (
      <ProfileEditText
        data-test="edit-intro"
        onKeyDown={handleEditTextResize}
        onChange={handleEditTextChange}
        value={intro}
      ></ProfileEditText>
    ) : (
      <ProfileText>{intro}</ProfileText>
    );
  };

  const getEditButtonElement = (): JSX.Element => {
    if (user.id === profile.userId) {
      return <EditButton onClick={handleEditButtonClick}>{editState ? '저장' : '편집'}</EditButton>;
    } else {
      return <></>;
    }
  };

  return (
    <>
      <ProfileContainer title="자기소개">
        {getEditButtonElement()}
        {getTextElement()}
      </ProfileContainer>
    </>
  );
}

const ProfileText = styled.pre`
  width: 600px;
  min-height: 40px;
  margin: 20px;
  white-space: pre-wrap;
  word-break: break-all;
  overflow: auto;
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
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  margin: 20px 20px 0 0;
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
  &:hover {
    background-color: ${(props) => props.theme.PrimaryHover};
  }
`;
export default ProfileIntroBox;
