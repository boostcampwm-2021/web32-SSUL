import React, {useState} from 'react';
import Category from './Category';
import Personnel from './Personnel';
import TechStack from './TechStack';
import GroupInfo from './GroupInfo';
import Date from './Date';
import GageBar from './GageBar';
import CustomButton from './CustomButton';
import styled from '@emotion/styled';

const MAX_CONTENT_INDEX = 4;

function CreateGroupPage(): JSX.Element {
  const [contentsNumber, setContentsNumber] = useState<number>(0);
  
  const getContents = () : JSX.Element | null =>{
    switch (contentsNumber){
      case 0: return <Category/>;
      case 1: return <Personnel/>;
      case 2: return <GroupInfo/>
      case 3: return <Date/>;
      case 4: return <TechStack/>;
      default: return null;
    }
  }
  const clickPrevContents = () =>{
    if(contentsNumber > 0)
      setContentsNumber(contentsNumber-1);
  }
  
  const clickNextContents = () =>{
    if(contentsNumber < MAX_CONTENT_INDEX)
      setContentsNumber(contentsNumber+1);
  }
  
  return (
    <CreateForm>
      <GageBar contentsNumber={contentsNumber}/>
      <ContentsContainer>
        {getContents()}
      </ContentsContainer>
      <ButtonWrapper>
        <CustomButton
          label={'이전'}
          color={'#00C5AA'}
          backgroundColor={'#FFFFFF'}
          clickBtn={clickPrevContents}
        />
        <CustomButton
          label={'다음'}
          color={'#FFFFFF'}
          backgroundColor={'#00C5AA'}
          clickBtn={clickNextContents}
        />
      </ButtonWrapper>
    </CreateForm>
  )
}

const CreateForm = styled.div`
  position: relative;
  padding: 20px;
  margin: 70px auto 0 auto;
  width: 600px;
  height: 500px;
  box-shadow: 20px 20px 40px 4px rgba(41, 36, 36, 0.25), -20px -20px 0px 6px #FFFFFF;
  border-radius: 40px;
`;

const ContentsContainer = styled.div`
  margin: auto;
  height: 400px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 40px;
  display: flex;
  
`
export default CreateGroupPage;
