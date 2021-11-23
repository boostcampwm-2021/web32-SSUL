import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

function GroupIntro(): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [intro, setIntro] = useState<string>('안녕하세요~');
  const textInput = useRef<HTMLTextAreaElement>(null);
  
  const handleEditButtonClick = () => {
    const text = textInput.current?.value;
    if(isEdit && text){
      setIntro(text);
    }
    setIsEdit(!isEdit);
  }

  return (
    <Container>
      <Header>
        <BoxTitle>소개</BoxTitle>
        <EditButton onClick={handleEditButtonClick}>{isEdit ? '저장' : '편집'}</EditButton>
      </Header>
      {isEdit ? <EditText ref={textInput} defaultValue={intro}></EditText> : <Text>{intro}</Text>}
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

export default GroupIntro;
