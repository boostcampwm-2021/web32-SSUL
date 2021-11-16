import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TechStackInput from '@pages/GroupCreatePage/TechStackInput';
import { TechStack } from '@types';
import { techStackHttpClient } from '@api';
import CustomButton from '@pages/GroupCreatePage/CustomButton';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectProfileData, setProfileData } from '@store/slices/profileDataSlice';

interface Props {
  onCancel: () => void;
}
function EditTechStack({ onCancel }: Props): JSX.Element {
  const { techStacks } = useAppSelector(selectProfileData);
  const dispatch = useAppDispatch();
  const [baseTechStacks, setBaseTechStacks] = useState<TechStack[]>([]);
  const [usingStacks, setUsingStacks] = useState<string[]>(techStacks);

  const handleConfirmButtonClick = () =>{
    dispatch(setProfileData({techStacks: usingStacks}));
    //TODO : PUT
    onCancel();
  }
  useEffect(() => {
    const fetechTechStackList = async () => {
      const response: TechStack[] = await techStackHttpClient.getTechStackList();
      setBaseTechStacks(response);
    };
    fetechTechStackList();
  }, []);

  return (
    <Container>
      <ModalTitle>기술스택을 선택해주세요!</ModalTitle>
      <TechStackInput
        baseTechStackList={baseTechStacks}
        usingTechStacks={usingStacks}
        setUsingTechStacks={setUsingStacks}
      />
      <ButtonWrapper>
        <CustomButton label={'취소'} clickBtn={onCancel} />
        <CustomButton label={'확인'} clickBtn={handleConfirmButtonClick} />
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
  font-weight: bold;
`;
export default EditTechStack;
