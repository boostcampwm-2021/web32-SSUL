import styled from '@emotion/styled';
import React from 'react';
import { groupCreateDataState, setGroupData } from '@store/group/makerSlice';
import { useAppDispatch, useAppSelector } from '@hooks';
import { GROUP_NAME_INTRO, GROUP_INTRO } from '@constants/consts';

function GroupInfoInput(): JSX.Element {
  const { name, intro } = useAppSelector(groupCreateDataState);
  const dispatch = useAppDispatch();

  const setGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGroupData({ name: e.target.value }));
  };

  const setGroupInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setGroupData({ intro: e.target.value }));
  };
  return (
    <>
      <NameText
        data-test="group-name"
        onChange={setGroupName}
        value={name}
        placeholder={GROUP_NAME_INTRO}
      />
      <InfoText
        data-test="group-intro"
        onChange={setGroupInfo}
        value={intro}
        placeholder={GROUP_INTRO}
      />
    </>
  );
}

const NameText = styled.input`
  border: none;
  padding: 20px;
  margin: 40px auto;
  width: 400px;
  height: 50px;
  resize: none;
  border-radius: 10px;
  box-shadow: inset 0px 0px 4px rgb(0 0 0 / 25%);
  &:focus {
    outline: none;
  }
`;
const InfoText = styled.textarea`
  border: none;
  padding: 20px;
  width: 400px;
  height: 150px;
  resize: none;
  border-radius: 10px;
  box-shadow: inset 0px 0px 4px rgb(0 0 0 / 25%);
  &:focus {
    outline: none;
  }
`;
export default GroupInfoInput;
