import React from 'react';
import styled from '@emotion/styled';
import { formatDateToString } from '@utils/Date';

const groupList = [
  {
    groupId: 1,
    categoryImage:
      'https://neighborly-ash-fed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F075b46f8-ebd6-43ef-80b0-1cc1f2c6ebe0%2Ficon-study.png?table=block&id=45def0e6-f405-4184-93d8-ee69afa3ea23&spaceId=1e190b35-e398-4c80-9518-9c3889034187&width=1020&userId=&cache=v2',
    groupName: '스프링 공부하는 스터디를 공부하는 스프링을 공부하는 스터디를 공부하는 스프링',
    categoryName: '대외활동',
    intro: '그룹 소개 입니다.',
    startAt: '2020',
    endAt: '2020',
  },
  {
    groupId: 2,
    categoryImage:
      'https://neighborly-ash-fed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F075b46f8-ebd6-43ef-80b0-1cc1f2c6ebe0%2Ficon-study.png?table=block&id=45def0e6-f405-4184-93d8-ee69afa3ea23&spaceId=1e190b35-e398-4c80-9518-9c3889034187&width=1020&userId=&cache=v2',
    groupName: '스프링 공부하는 스터디를 공부하는 스프링을 공부하는 스터디를 공부하는 스프링',
    categoryName: '대외활동',
    intro: '그룹 소개 입니다.',
    startAt: '2020',
    endAt: '2020',
  },
];
function GroupList(): JSX.Element {
  const makeRequestBox = groupList.map((group, idx) => {
    return (
      <BoxContainer key={idx}>
        <CategoryContainer>
          <CategoryImage src={group.categoryImage} />
          <CategoryText>{group.categoryName}</CategoryText>
        </CategoryContainer>
        <GroupInfo>
          <GroupName>{group.groupName}</GroupName>
          <GroupIntro>{group.intro}</GroupIntro>
        </GroupInfo>
        <GroupDueDate>
          {formatDateToString(group.startAt)} ~ {formatDateToString(group.endAt)}
        </GroupDueDate>
        <ButtonWrapper>
          <GroupInfoButton>그룹 보기</GroupInfoButton>
          {idx % 2 === 0 ? (
            <ApplyButton>신청 하기</ApplyButton>
          ) : (
            <CancelButton>신청 취소</CancelButton>
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
