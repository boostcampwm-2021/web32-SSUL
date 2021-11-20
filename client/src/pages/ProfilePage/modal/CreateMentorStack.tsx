import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TechStackInput from '@pages/GroupCreatePage/TechStackInput';
import { TechStack } from '@types';
import { mentoringHttpClient, techStackHttpClient } from '@api';
import CustomButton from '@pages/GroupCreatePage/CustomButton';
import { useAppDispatch, useAppSelector } from '@hooks';
import { setProfileData } from '@store/user/profileSlice';
import { selectUser } from '@store/user/globalSlice';

interface Props {
  onCancel: () => void;
}
function CreateMentorStack({ onCancel }: Props): JSX.Element {
  const [baseTechStacks, setBaseTechStacks] = useState<TechStack[]>([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState<TechStack[]>([]);
  const [notificationText, setNotificationText] = useState<string>('');
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const checkMentorStack = () => selectedTechStacks.length > 0;

  const requestCreateMentor = async () => {
    if (!checkMentorStack()) {
      setNotificationText('최소 1개 이상 기술스택을 선택해주세요!');
      return;
    }
    if (user.id === undefined) {
      setNotificationText('로그인 정보가 없습니다!');
      return;
    }
    setNotificationText('');
    try {
      await mentoringHttpClient.registerMentor({ userId: user.id, techStacks: selectedTechStacks });
      dispatch(setProfileData({ mentoringStack: selectedTechStacks, isMentor: true }));
      onCancel();
    } catch (e) {
      setNotificationText('멘토 신청에 실패했습니다!');
    }
  };

  useEffect(() => {
    const fetechTechStackList = async () => {
      const response: TechStack[] = await techStackHttpClient.getTechStackList();
      setBaseTechStacks(response);
    };

    fetechTechStackList();
  }, []);

  return (
    <Container>
      <ModalTitle>멘토링을 원하는 기술스택을 선택해주세요!</ModalTitle>
      <TechStackInput
        baseTechStackList={baseTechStacks}
        usingTechStacks={selectedTechStacks}
        setUsingTechStacks={setSelectedTechStacks}
      />
      <ButtonWrapper>
        <CustomButton label={'취소'} clickBtn={onCancel} />
        <CustomButton label={'확인'} clickBtn={requestCreateMentor} />
      </ButtonWrapper>
      <Notification>{notificationText}</Notification>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 600px;
  height: 350px;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  width: 200px;
`;
const ModalTitle = styled.p`
  margin-left: 10px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Notification = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 13px;
  line-height: 40px;
  margin-left: 20px;
  color: ${(props) => props.theme.Error};
`;
export default CreateMentorStack;
