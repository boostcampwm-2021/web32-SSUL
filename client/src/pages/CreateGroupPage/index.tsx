import React, {useState} from 'react';
import Category from './Category';
import Personnel from './Personnel';
import TechStack from './TechStack';
import GroupInfo from './GroupInfo';
import StartDate from './StartDate';
import GageBar from './GageBar';
import styled from '@emotion/styled';

function CreateGroupPage(): JSX.Element {
  const [contentsNumber, setContentsNumber] = useState<number>(0);
  
  const getContents = () : JSX.Element | null =>{
    switch (contentsNumber){
      case 0: return <Category/>;
      case 1: return <Personnel/>;
      case 2: return <TechStack/>;
      case 3: return <GroupInfo/>;
      case 4: return <StartDate/>;
      default: return null;
    }
  }
  
  const clickPrevContents = () =>{
    if(contentsNumber > 0)
      setContentsNumber(contentsNumber-1);
  }
  
  const clickNextContents = () =>{
    if(contentsNumber < 4)
      setContentsNumber(contentsNumber+1);
  }
  
  return (
    <CreateForm>
      <GageBar contentsNumber={contentsNumber}/>
      <ContentsContainer>
        {getContents()}
      </ContentsContainer>
      <ButtonWrapper>
        <button onClick={clickPrevContents}>이전</button>
        <button onClick={clickNextContents}>다음</button>
      </ButtonWrapper>
    </CreateForm>
  )
}

const CreateForm = styled.div`
  position: relative;
  padding: 20px;
  margin: 100px auto 0 auto;
  width: 600px;
  height: 600px;
  box-shadow: 20px 20px 40px 4px rgba(41, 36, 36, 0.25), -20px -20px 0px 6px #FFFFFF;
  border-radius: 40px;
`;

const ContentsContainer = styled.div`
  margin: 100px auto;
  height: 400px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 40px;
  margin-bottom: 40px;
  display: flex;
  
`
export default CreateGroupPage;
