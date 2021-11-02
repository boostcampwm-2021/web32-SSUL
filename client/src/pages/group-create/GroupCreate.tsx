import React from 'react';
import styled from "@emotion/styled";

function GroupCreate(): JSX.Element {
  return (
    <CreateForm>
      <div>Gage bar</div>
      <div>Contents</div>
      <ButtonWrapper>
        <button>이전</button>
        <button>다음</button>
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