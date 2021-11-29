import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import CustomButton from '@pages/GroupCreatePage/CustomButton';
import { mentoringHttpClient } from '@api';
import { selectProfileData } from '@store/user/profileSlice';
import { useAppSelector } from '@hooks';
import { MentoringAcceptRequestDto, MentoringRequest } from '@types';
import { formatDateToString } from '@utils/Date';

function RequestMentoring(): JSX.Element {
  const [requestList, setRequestList] = useState<MentoringRequest[]>([]);
  const { mentorId, userId } = useAppSelector(selectProfileData);

  const fetchMentoringRequests = async () => {
    const fetchedData: MentoringRequest[] = await mentoringHttpClient.getMentoringRequest(mentorId);
    setRequestList(fetchedData);
  };

  const handleAcceptButtonClick = (data: MentoringRequest) => async () => {
    const body: MentoringAcceptRequestDto = {
      id: data.id,
      groupId: data.groupId,
      userId: userId,
    };
    try {
      await mentoringHttpClient.acceptMentoringRequest(body);
      fetchMentoringRequests();
    } catch (e) {
      console.log(e);
    }
  };

  const handleRejectButtonClick = (data: MentoringRequest) => async () => {
    try {
      await mentoringHttpClient.rejectMentoringRequest(data.id);
      fetchMentoringRequests();
    } catch (e) {
      console.log(e);
    }
  };

  const makeRequestBox = (data: MentoringRequest, idx: number): JSX.Element => {
    return (
      <BoxContainer data-test="request-container" key={idx}>
        <ImageContainer>
          <CategoryImage src={data.categoryImage} />
        </ImageContainer>
        <GroupInfo>
          <GroupText>{data.groupName}</GroupText>
          <GroupText>{data.ownerName}</GroupText>
        </GroupInfo>
        <RequestDate>{formatDateToString(data.createdAt)}</RequestDate>
        <ButtonWrapper>
          <CustomButton label={'거절'} clickBtn={handleRejectButtonClick(data)} />
          <CustomButton label={'수락'} clickBtn={handleAcceptButtonClick(data)} />
        </ButtonWrapper>
      </BoxContainer>
    );
  };

  useEffect(() => {
    fetchMentoringRequests();
  }, []);
  return (
    <Container>
      <ModalTitle>멘토링 신청 리스트</ModalTitle>
      {requestList.length > 0 ? (
        <ScrollContainer>
          {requestList.map((data, idx) => makeRequestBox(data, idx))}
        </ScrollContainer>
      ) : (
        <>
          <EmptyMessage>아직 멘토링 요청이 없어요...</EmptyMessage>
          <SubMessage>프로필을 업데이트 해보는건 어떨까요?</SubMessage>
        </>
      )}
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
  margin: 0 0 20px 20px;
  font-size: 18px;
  font-weight: bold;
`;

const BoxContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 550px;
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
  width: 200px;
`;

const RequestDate = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 5px;
  margin-right: 20px;
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const GroupText = styled.p`
  width: 150px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 100px;
`;
const SubMessage = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => props.theme.Gray3};
  margin-top: 20px;
`;
export default RequestMentoring;
