import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TechStackInput from '@pages/GroupCreatePage/TechStackInput';
import { TechStack } from '@types';
import { mentoringHttpClient, techStackHttpClient } from '@api';
import CustomButton from '@pages/GroupCreatePage/CustomButton';
import { useAppDispatch, useAppSelector, useToast } from '@hooks';
import { selectUser } from '@store/user/globalSlice';
import { setProfileData } from '@store/user/profileSlice';
import {
  MENTOR_TECH_STACK_INTRO,
  MSG_MIN_TECH_STACK_INFO,
  MSG_MENTOR_APPLY_ERROR,
} from '@constants/consts';

interface Props {
  onCancel: () => void;
}
function CreateMentorStack({ onCancel }: Props): JSX.Element {
  const [baseTechStacks, setBaseTechStacks] = useState<TechStack[]>([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState<TechStack[]>([]);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [toastify] = useToast();
  const checkMentorStack = () => selectedTechStacks.length > 0;

  const requestCreateMentor = async () => {
    if (!user.id) return;
    if (!checkMentorStack()) {
      toastify(MSG_MIN_TECH_STACK_INFO, 'INFO');
      return;
    }
    try {
      await mentoringHttpClient.registerMentor({
        userId: user.id,
        techStacks: selectedTechStacks,
      });
      const { mentorId } = await mentoringHttpClient.getMentorId(user.id);
      dispatch(setProfileData({ mentorId, isMentor: true, mentoringStack: selectedTechStacks }));
      onCancel();
    } catch (e) {
      toastify(MSG_MENTOR_APPLY_ERROR, 'ERROR');
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
      <ModalTitle>{MENTOR_TECH_STACK_INTRO}</ModalTitle>
      <TechStackInput
        baseTechStackList={baseTechStacks}
        usingTechStacks={selectedTechStacks}
        setUsingTechStacks={setSelectedTechStacks}
      />
      <ButtonWrapper>
        <CustomButton label={'취소'} clickBtn={onCancel} />
        <CustomButton label={'확인'} clickBtn={requestCreateMentor} />
      </ButtonWrapper>
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

export default CreateMentorStack;
