import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TechStackInput from '@pages/GroupCreatePage/TechStackInput';
import { TechStack } from '@types';
import { techStackHttpClient } from '@api';

interface Props{
  currentUsingTechStacks: string[];
}
function EditTechStack({currentUsingTechStacks}: Props): JSX.Element {
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
    </Container>
  );
}

const Container = styled.div`
  width: 600px;
  height: 300px;
` 
export default EditTechStack;
