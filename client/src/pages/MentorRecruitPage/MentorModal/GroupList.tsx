import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { formatDateToString } from '@utils/Date';
import { groupHttpClient, mentoringHttpClient } from '@api';
import { SimpleMentoringRequest, MentoringRequestPostData, OwnGroup } from '@types';
import { useAppDispatch, useAppSelector } from '@hooks';
import { mentorCardDetailState } from '@store/mentor/cardDetailSlice';
import { changeGroupModalState } from '@store/util/Slice';
import { useHistory } from 'react-router';

function GroupList(): JSX.Element {
  const [ownGroups, setOwnGroups] = useState<OwnGroup[]>([]);
  const [allMentoringRequests, setAllMentoringRequests] = useState<SimpleMentoringRequest[]>([]);
  const { mentorId } = useAppSelector(mentorCardDetailState);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const getOwnGroups = async () => {
    const allOwnGroups = (await groupHttpClient.getOwnGroups()).filter((group) => !group.mentorId);
    const allMentoringRequests = await mentoringHttpClient.getAllMentoringRequests();
    setOwnGroups(allOwnGroups);
    setAllMentoringRequests(allMentoringRequests);
  };

  useEffect(() => {
    getOwnGroups();
  }, []);

  const handleButtonClick = (type: string, groupId: number) => {
    return async () => {
      if (type === 'GROUP_INFO') {
        history.push({ pathname: `/group/${groupId}` });
      } else if (type === 'APPLY_BUTTON') {
        const postData: MentoringRequestPostData = { groupId, mentorId };
        await mentoringHttpClient.postMentoringRequests(postData);
      } else if (type === 'CANCEL_BUTTON') {
        const deleteQuery = `?mentor=${mentorId}&group=${groupId}`;
        await mentoringHttpClient.deleteMentoringRequests(deleteQuery);
      }
      dispatch(changeGroupModalState('NONE'));
    };
  };

  const makeRequestBox = ownGroups.map((group) => {
    const alreadyRequestMentoring = allMentoringRequests.find(
      (mentoringRequest) =>
        mentoringRequest.group.id === group.id && mentoringRequest.mentor.id === mentorId,
    );

    return (
      <BoxContainer key={group.id}>
        <CategoryContainer>
          <CategoryImage src={group.category.imageUrl} />
          <CategoryText>{group.category.name}</CategoryText>
        </CategoryContainer>
        <GroupInfo>
          <GroupName>{group.name}</GroupName>
          <GroupIntro>{group.intro}</GroupIntro>
        </GroupInfo>
        <GroupDueDate>
          {formatDateToString(group.startAt)} ~ {formatDateToString(group.endAt)}
        </GroupDueDate>
        <ButtonWrapper>
          <GroupInfoButton onClick={handleButtonClick('GROUP_INFO', group.id)}>
            그룹 보기
          </GroupInfoButton>
          {alreadyRequestMentoring ? (
            <CancelButton onClick={handleButtonClick('CANCEL_BUTTON', group.id)}>
              신청 취소
            </CancelButton>
          ) : (
            <ApplyButton onClick={handleButtonClick('APPLY_BUTTON', group.id)}>
              신청 하기
            </ApplyButton>
          )}
        </ButtonWrapper>
      </BoxContainer>
    );
  });

  return (
    <Container>
      <ScrollContainer>{makeRequestBox}</ScrollContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const ScrollContainer = styled.div`
  height: 450px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BoxContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 450px;
  height: 120px;
  margin: 0 auto 20px auto;
  border-radius: 5px;
  border: 1px ${(props) => props.theme.Gray5} solid;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
  height: 85px;
  margin: 20px;
  justify-content: space-between;
`;

const CategoryImage = styled.img`
  width: 60px;
  height: 60px;
  margin: 5px 0px;
  padding: 5px;
  border: 1px ${(props) => props.theme.Gray5} solid;
  border-radius: 10px;
  object-fit: fill;
`;

const CategoryText = styled.h4`
  text-align: center;
`;

const GroupDueDate = styled.h5`
  color: ${(props) => props.theme.Gray3};
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
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  color: ${(props) => props.theme.PrimaryDark};
`;

const GroupName = styled(GroupText)`
  width: 300px;
  font-size: 15px;
  color: ${(props) => props.theme.Black};
`;

const GroupIntro = styled(GroupText)`
  width: 200px;
  font-size: 12px;
  color: ${(props) => props.theme.Gray4};
`;

const Button = styled.button`
  margin: 0px 4px;
  padding: 2px 10px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
`;

const ApplyButton = styled(Button)`
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
`;

const CancelButton = styled(Button)`
  background-color: ${(props) => props.theme.White};
  color: ${(props) => props.theme.Red};
`;

const GroupInfoButton = styled(Button)`
  color: ${(props) => props.theme.Primary};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  margin-left: auto;
`;

export default GroupList;
