import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TechStackInput from '@pages/GroupCreatePage/TechStackInput';
import { TechStack } from '@types';
import { techStackHttpClient } from '@api';
import CustomButton from '@pages/GroupCreatePage/CustomButton';

interface Props {
  currentUsingTechStacks: string[];
  onCancel: () => void;
}
function EditTechStack({ currentUsingTechStacks, onCancel }: Props): JSX.Element {
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const [usingStacks, setUsingStacks] = useState<string[]>(currentUsingTechStacks);

  useEffect(() => {
    const fetechTechStackList = async () => {
      const response: TechStack[] = await techStackHttpClient.getTechStackList();
      setTechStacks(response);
    };

    fetechTechStackList();
  }, []);

  return (
    <Container>
      <TechStackInput
        baseTechStackList={techStacks}
        usingTechStacks={usingStacks}
        setUsingTechStacks={setUsingStacks}
      />
      <ButtonWrapper>
        <CustomButton
          style={{
            color: '#00C5AA',
            backgroundColor: '#FFFFFF',
            margin: '0 20px 0 0',
          }}
          label={'취소'}
          clickBtn={onCancel}
        />
        <CustomButton
          style={{
            color: '#FFFFFF',
            backgroundColor: '#00C5AA',
          }}
          label={'확인'}
          clickBtn={onCancel}
        />
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 600px;
  height: 300px;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
`;
export default EditTechStack;
