import React, {useState} from 'react';
import Category from './input-contents/Category';
import Personnel from './input-contents/Personnel';
import TechStack from './input-contents/TeckStack';
import GroupInfo from './input-contents/GroupInfo';
import StartDate from './input-contents/StartDate';
import GageBar from './GageBar';
import styled from '@emotion/styled';

function GroupCreate(): JSX.Element {
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
  
  const clickPrev = () =>{
    if(contentsNumber > 0)
      setContentsNumber(contentsNumber-1);
  }
  
  const clickNext = () =>{
    if(contentsNumber < 4)
      setContentsNumber(contentsNumber+1);
  }
  
  return (
    <CreateForm>
      <GageBar/>
      {getContents()}
      <ButtonWrapper>
        <button onClick={clickPrev}>이전</button>
        <button onClick={clickNext}>다음</button>
      </ButtonWrapper>
    </CreateForm>
  )
}

const CreateForm = styled.div`
  position: relative;
  margin: 100px auto;
  width: 600px;
  height: 600px;
  opacity: 0.4;
  box-shadow: 20px 20px 40px 4px rgba(41, 36, 36, 0.25), -20px -20px 0px 6px #FFFFFF;
  border-radius: 40px;
`

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 40px;
  margin-bottom: 40px;
  display: flex;
  
`
export default GroupCreate;