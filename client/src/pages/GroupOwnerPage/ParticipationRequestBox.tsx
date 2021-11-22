import React, { useState } from 'react';
import styled from '@emotion/styled';
import { formatDateToString } from '@utils/Date';

interface ParticipationRequest {
  profileImage: string;
  name: string;
  githubId: string;
  createdAt: string;
  feverStack: number;
}

function ParticipationRequestBox(): JSX.Element {
  const [requestList, setRequestList] = useState<ParticipationRequest[]>([
    {
      profileImage: 'https://avatars.githubusercontent.com/u/6914465?v=4',
      name: '김용후',
      githubId: 'Who-is-hu',
      createdAt: '2021-11-22',
      feverStack: 39.5,
    },
    {
      profileImage: 'https://avatars.githubusercontent.com/u/55623688?v=4',
      name: '유찬양',
      githubId: 'ChanYangYu',
      createdAt: '2021-11-22',
      feverStack: 39.5,
    },
    {
      profileImage: 'https://avatars.githubusercontent.com/u/55623688?v=4',
      name: '유찬양',
      githubId: 'ChanYangYu',
      createdAt: '2021-11-22',
      feverStack: 39.5,
    },
    {
      profileImage: 'https://avatars.githubusercontent.com/u/55623688?v=4',
      name: '유찬양',
      githubId: 'ChanYangYu',
      createdAt: '2021-11-22',
      feverStack: 39.5,
    },
    {
      profileImage: 'https://avatars.githubusercontent.com/u/55623688?v=4',
      name: '유찬양',
      githubId: 'ChanYangYu',
      createdAt: '2021-11-22',
      feverStack: 0,
    },
    {
      profileImage: 'https://avatars.githubusercontent.com/u/55623688?v=4',
      name: '유찬양',
      githubId: 'ChanYangYu',
      createdAt: '2021-11-22',
      feverStack: 39.5,
    },
    
  ]);

  const handleAcceptButtonClick = () => async () => {
    console.log('accept');
    setRequestList([]);
  };

  const handleRejectButtonClick = () => async () => {
    console.log('reject');
  };

  const makeRequestBox = (data: ParticipationRequest, idx: number): JSX.Element => {
    return (
      <BoxContainer key={idx}>
        <ProfileImage src={data.profileImage} />
        <ProfileInfo>
          <ProfileText>{data.name}</ProfileText>
          <ProfileFeverStack>
            <FeverNum>{data.feverStack}</FeverNum>
          </ProfileFeverStack>
        </ProfileInfo>
        <RequestDate>{formatDateToString(data.createdAt)}</RequestDate>
        <ButtonWrapper>
          <Reject onClick={handleRejectButtonClick()}>거절</Reject>
          <Accept onClick={handleAcceptButtonClick()}>수락</Accept>
        </ButtonWrapper>
      </BoxContainer>
    );
  };
  return (
    <Container>
      <ModalTitle>그룹참가 요청 리스트</ModalTitle>
      {requestList.length > 0 ? (
        <ScrollContainer>
          {requestList.map((data, idx) => makeRequestBox(data, idx))}
        </ScrollContainer>
      ) : (
        <>
          <EmptyMessage>아직 그룹 요청이 없어요...</EmptyMessage>
          <SubMessage>그룹 소개를 업데이트 해보는건 어떨까요?</SubMessage>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 400px;
  border: 1px ${(props) => props.theme.Gray5} solid;
  border-radius: 5px;
`;

const ScrollContainer = styled.div`
  overflow-y: scroll;
  height: 400px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ModalTitle = styled.p`
  margin: 10px 0 20px 20px;
  font-size: 16px;
  font-weight: bold;
`;

const BoxContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 380px;
  height: 80px;
  border-radius: 5px;
  margin: 0 0 20px 10px;
  border: 1px ${(props) => props.theme.Gray5} solid;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 50%;
  object-fit: fill;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProfileText = styled.p`
  width: 150px;
  margin: 0 5px;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ProfileFeverStack = styled.div`
  height: 20px;
  width: 70px;
  align-self: center;
  background-color: ${(props) => props.theme?.Fever};
  border-radius: 10px;
  cursor: pointer;
  margin-top: 5px;
  &:hover > span {
    display: flex;
    color: ${(props) => props.theme?.White};
  }
`;

const FeverNum = styled.span`
  display: flex;
  line-height: 20px;
  font-weight: 500;
  font-size: 13px;
  color: ${(props) => props.theme?.White};
  justify-content: center;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 150px;
`;
const SubMessage = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => props.theme.Gray3};
  margin-top: 20px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 15px;
  display: flex;
  justify-content: space-between;
  width: 120px;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  font-size: 12px;
  width: 50px;
  height: 30px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0px 3px 5px #8f8f8f, -5px -5px 10px #ffffff;
  &:active {
    box-shadow: inset 5px 5px 10px #8f8f8f, inset -5px -5px 10px #ffffff;
  }
`;

const Reject = styled(Button)`
  color: ${(props) => props.theme.Primary};
  background-color: ${(props) => props.theme.White};
`;

const Accept = styled(Button)`
  color: ${(props) => props.theme.White};
  background-color: ${(props) => props.theme.Primary};
`;

const RequestDate = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 13px;
  margin-top: 5px;
  margin-right: 20px;
`;

export default ParticipationRequestBox;
