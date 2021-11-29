import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectGroupAdminData, setGroupAdminData } from '@store/group/adminSlice';
import { groupOwnerHttpClient } from '@api';
import { MAX_INTRO_LEN, MIN_INTRO_LEN } from '@constants/consts';

function GroupIntro(): JSX.Element {
  const [notificationText, setNotificationText] = useState<string>('');
  const { groupId, intro } = useAppSelector(selectGroupAdminData);
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const textInput = useRef<string>(intro);

  const handleEditButtonClick = () => {
    const text = textInput.current;

    if (isEdit && text !== undefined) {
      if (text.length < MAX_INTRO_LEN || text.length > MIN_INTRO_LEN) {
        setNotificationText(`소개글은 ${MIN_INTRO_LEN} ~ ${MAX_INTRO_LEN}자 내외로 작성해주세요!`);
        return;
      }
      dispatch(setGroupAdminData({ intro: text }));
      groupOwnerHttpClient.updateGroupIntro({ gid: groupId, intro: text });
    }
    setNotificationText('');
    setIsEdit(!isEdit);
  };

  const handleEditTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    textInput.current = e.currentTarget.value;
  };

  return (
    <Container>
      <Header>
        <BoxTitle>소개</BoxTitle>
        <Notification>{notificationText}</Notification>
        <EditButton onClick={handleEditButtonClick}>{isEdit ? '저장' : '편집'}</EditButton>
      </Header>
      {isEdit ? (
        <EditText
          onChange={handleEditTextChange}
          defaultValue={intro}
          maxLength={MIN_INTRO_LEN}
        ></EditText>
      ) : (
        <Text>{intro}</Text>
      )}
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px auto;
`;

const BoxTitle = styled.p`
  padding: 0;
  margin-bottom: 0;
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const EditButton = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
  box-shadow: 0px 3px 5px #8f8f8f, -5px -5px 10px #ffffff;
  &:active {
    box-shadow: inset 5px 5px 10px #8f8f8f, inset -5px -5px 10px #ffffff;
  }
`;

const Text = styled.pre`
  width: 520px;
  min-height: 150px;
  margin: 20px 10px;
  white-space: pre-wrap;
  word-break: break-all;
  overflow: auto;
  font-size: 14px;
  font-family: 'Segoe UI';
`;

const EditText = styled.textarea`
  width: 520px;
  margin: 10px;
  min-height: 150px;
  font-size: 14px;
  resize: none;
  border: 1px ${(props) => props.theme.Primary} solid;
  border-radius: 5px;
  &:focus {
    outline: 2px ${(props) => props.theme.Primary} solid;
  }
`;

const Notification = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.Error}; ;
`;

export default GroupIntro;
