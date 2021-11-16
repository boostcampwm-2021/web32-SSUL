import React from 'react';
import styled from '@emotion/styled';
import CustomButton from '@pages/GroupCreatePage/CustomButton';

function RequestMentoring(): JSX.Element {
  const dummyData = ['테스트1', '테스트2', '테스트3', '테스트4', '테스트5'];
  const RequestBox = (name: string): JSX.Element => {
    return (
      <BoxContainer>
        <CategoryImage />
        <GroupInfo>
          <p>{name}</p>
          <p>그룹장명</p>
        </GroupInfo>
        <RequestDate>2021.11.15</RequestDate>
        <ButtonWrapper>
          <CustomButton label={'취소'} clickBtn={()=> console.log('hi')} />
          <CustomButton label={'확인'} clickBtn={()=> console.log('hi')} />
        </ButtonWrapper>
      </BoxContainer>
    );
  };
  return <Container>{dummyData.map((name) => RequestBox(name))}</Container>;
}

const Container = styled.div`
  position: relative;
  width: 600px;
  height: 300px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BoxContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 500px;
  height: 80px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px black solid;
`;

const CategoryImage = styled.div`
  width: 50px;
  height: 50px;
  margin: 20px;
  border: 1px black solid;
  border-radius: 50%;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  width: 200px;
`;

const RequestDate = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 20px;
`
const GroupInfo = styled.div`
  
`
export default RequestMentoring;
