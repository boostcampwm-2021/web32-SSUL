import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import CustomButton from '@pages/GroupCreatePage/CustomButton';
import { mentoringHttpClient } from '@api';
import { selectProfileData } from '@store/slices/profileDataSlice';
import { useAppSelector } from '@hooks';
import { MentoringRequestData } from '@types';
import { formatDateToString } from '@utils/Date';

function RequestMentoring(): JSX.Element {
  const [requestList, setRequestList] = useState<MentoringRequestData[]>([]);
  const { mentorId } = useAppSelector(selectProfileData);

  const makeRequestBox = (data: MentoringRequestData, idx: number): JSX.Element => {
    return (
      <BoxContainer key={idx}>
        <ImageContainer>
          <CategoryImage src={data.categoryImage} />
        </ImageContainer>
        <GroupInfo>
          <GroupText>{data.groupName}</GroupText>
          <GroupText>{data.ownerName}</GroupText>
        </GroupInfo>
        <RequestDate>{formatDateToString(data.createdAt)}</RequestDate>
        <ButtonWrapper>
          <CustomButton label={'거절'} clickBtn={() => console.log('hi')} />
          <CustomButton label={'수락'} clickBtn={() => console.log('hi')} />
        </ButtonWrapper>
      </BoxContainer>
    );
  };

  useEffect(() => {
    const fetchMentoringRequests = async () => {
      const fetchedData: MentoringRequestData[] = await mentoringHttpClient.getMentoringRequest(mentorId);
      setRequestList(fetchedData);
    };

    fetchMentoringRequests();
  });
  return (
    <Container>
      <ModalTitle>멘토링 신청 리스트</ModalTitle>
      <ScrollContainer>{requestList.map((data, idx) => makeRequestBox(data, idx))}</ScrollContainer>
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
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
`;

export default RequestMentoring;
