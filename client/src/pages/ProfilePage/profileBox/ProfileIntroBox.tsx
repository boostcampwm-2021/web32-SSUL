import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ProfileContainer from './ProfileBoxContainer';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectProfileData, setProfileData } from '@store/slices/profileDataSlice';
import { userHttpClient } from '@api';
import { selectUser } from '@store/slices/userSlice';
import { UpdateIntroRequest } from '@types';

function ProfileIntroBox(): JSX.Element {
  const { intro } = useAppSelector(selectProfileData);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [prevIntro, setPrevIntro] = useState<string>('');
  const [editState, setEditState] = useState<boolean>(false);

  const handleEditButtonClick = async () => {
    if (editState === true && prevIntro !== intro) {
      const request = {
        id: user.id,
        intro: intro,
      } as UpdateIntroRequest;
      setPrevIntro(intro);
      userHttpClient.patchIntro(request);
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

  useEffect(() => {
    const fetchProfileIntro = async () => {
      if (user.id !== undefined) {
        const fetchedIntro = await userHttpClient.getIntro(user.id);
        setPrevIntro(fetchedIntro);
        dispatch(setProfileData({ intro: fetchedIntro }));
      }
    };

    fetchProfileIntro();
  }, [user]);
  const getTextElement = (): JSX.Element => {
    return editState ? (
      <ProfileEditText
        onKeyDown={handleEditTextResize}
        onChange={handleEditTextChange}
        value={intro}
      ></ProfileEditText>
    ) : (
      <ProfileText>{intro}</ProfileText>
    );
  };

  return (
    <>
      <ProfileContainer title="자기소개">
        <EditButton onClick={handleEditButtonClick}>{editState ? '저장' : '편집'}</EditButton>
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
