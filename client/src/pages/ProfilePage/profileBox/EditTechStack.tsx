import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TechStackInput from '@pages/GroupCreatePage/TechStackInput';
import { TechStack } from '@types';
import { techStackHttpClient } from '@api';

function EditTechStack(): JSX.Element {
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);

  useEffect(() => {
    const fetechTechStackList = async () => {
      const response: TechStack[] = await techStackHttpClient.getTechStackList();
      setTechStacks(response);
    };

    fetechTechStackList();
  }, []);


  return (
    <Container>
      <TechStackInput techStacks={techStacks}/>
    </Container>
  );
}

const Container = styled.div`
  width: 600px;
  height: 300px;
` 
export default EditTechStack;
