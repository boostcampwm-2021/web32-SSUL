import React from 'react';
import styled from '@emotion/styled';
import CustomButton from '@pages/GroupCreatePage/CustomButton';

interface Props {
  onCancel: () => void;
}
function RequestMentoring({ onCancel }: Props): JSX.Element {
  const dummyData = ['테스트1', '테스트2', '테스트3', '테스트4', '테스트5'];
  const handleCloseButtonClick = () => onCancel();
  const makeRequestBox = (name: string, idx: number): JSX.Element => {
    return (
      <BoxContainer key={idx}>
        <ImageContainer>
          <CategoryImage src="https://neighborly-ash-fed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F075b46f8-ebd6-43ef-80b0-1cc1f2c6ebe0%2Ficon-study.png?table=block&id=45def0e6-f405-4184-93d8-ee69afa3ea23&spaceId=1e190b35-e398-4c80-9518-9c3889034187&width=1020&userId=&cache=v2" />
        </ImageContainer>
        <GroupInfo>
          <GroupText>{name}</GroupText>
          <GroupText>그룹장명</GroupText>
        </GroupInfo>
        <RequestDate>2021.11.15</RequestDate>
        <ButtonWrapper>
          <CustomButton label={'거절'} clickBtn={() => console.log('hi')} />
          <CustomButton label={'수락'} clickBtn={() => console.log('hi')} />
        </ButtonWrapper>
      </BoxContainer>
    );
  };

  return (
    <Container>
      <CloseButton
        onClick={handleCloseButtonClick}
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
      </CloseButton>
      <ModalTitle>멘토링 신청 리스트</ModalTitle>
      <ScrollContainer>{dummyData.map((name, idx) => makeRequestBox(name, idx))}</ScrollContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 600px;
  height: 350px;
`;

const ScrollContainer = styled.div`
  width: 600px;
  height: 300px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ModalTitle = styled.p`
  margin: 0 0 20px 40px;
  font-size: 18px;
  font-weight: bold;
`;
const BoxContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 500px;
  height: 90px;
  margin: 0 auto 20px auto;
  border-radius: 5px;
  border: 1px ${(props) => props.theme.Gray5} solid;
`;

const ImageContainer = styled.div`
  width: 60px;
  height: 60px;
  margin: 20px;
  border-radius: 50%;
  border: 1px ${(props) => props.theme.Gray5} solid;
`;
const CategoryImage = styled.img`
  width: 40px;
  height: 40px;
  margin: 10px 0 0 10px;
  object-fit: fill;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 15px;
  display: flex;
  justify-content: space-between;
  width: 180px;
`;

const CloseButton = styled.svg`
  position: absolute;
  right: 0;
  margin-right: 40px;
  cursor: pointer;
`;

const RequestDate = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 5px;
  margin-right: 20px;
`;
const GroupInfo = styled.div``;
const GroupText = styled.p`
  margin-bottom: 5px;
`;

export default RequestMentoring;
