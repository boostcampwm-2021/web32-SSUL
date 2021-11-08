import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../../store/rootReducer';
import { GroupData } from '../../../types/CreateGroup';
import { setGroupData } from '../../../store/slices/createGroupData';

function GroupInfoInput(): JSX.Element {
  const { groupName, groupInfo } = useSelector<ReducerType, GroupData>(
    (state) => state.createGroupData,
  );
  const dispatch = useDispatch();

  const setGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGroupData({ groupName: e.target.value }));
  };

  const setGroupInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setGroupData({ groupInfo: e.target.value }));
  };
  return (
    <>
      <NameText onChange={setGroupName} value={groupName} placeholder="그룹명을 작성해주세요." />
      <InfoText onChange={setGroupInfo} value={groupInfo} placeholder="그룹소개를 작성해주세요." />
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
  box-shadow: 5px 5px 10px #8f8f8f, -5px -5px 10px #ffffff;
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
  box-shadow: 5px 5px 10px #8f8f8f, -5px -5px 10px #ffffff;
  &:focus {
    outline: none;
  }
`;
export default GroupInfoInput;
