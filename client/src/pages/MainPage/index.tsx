import React, { useState } from 'react';
import styled from '@emotion/styled';
import CategoryItem from './CategoryItem';
import { CenterLayout } from '../../styles/global';
import { LinkButton } from '../../components';
import DeveloperImg from '../../assets/images/developer-img.jpg';

const Tab = Object.freeze({
  GROUP: 'GROUP',
  MENTOR: 'MENTOR',
});

function MainPage(): JSX.Element {
  const [tab, setTab] = useState(Tab.GROUP);

  return (
    <CenterLayout>
      <InfoContainer>
        <Header>
          <TextBtn selected={tab === Tab.GROUP} onClick={() => setTab(Tab.GROUP)}>
            그룹 찾기
          </TextBtn>
          <TextBtn selected={tab === Tab.MENTOR} onClick={() => setTab(Tab.MENTOR)}>
            멘토 찾기
          </TextBtn>
        </Header>

        {tab === Tab.GROUP && (
          <GroupFindContainer>
            <IntroText>함께 성장할 동료를 찾아보세요!</IntroText>
            <GroupCatagoryContainer>
              {dummy.map(({ name, url }) => (
                <CategoryItem key={name} name={name} url={url} />
              ))}
            </GroupCatagoryContainer>
          </GroupFindContainer>
        )}
        {tab === Tab.MENTOR && (
          <MentorFindContainer>
            <IntroText>인사이트를 넓힐 기회를 손쉽게</IntroText>
            <IntroText>가져보세요!</IntroText>
            <LinkButton to="/recruit/mentor" width={300} height={50}>
              멘토 찾기
            </LinkButton>
          </MentorFindContainer>
        )}
      </InfoContainer>

      <ImageWrapper>
        <DynamicImage src={DeveloperImg} alt="devloper" />
      </ImageWrapper>
    </CenterLayout>
  );
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;
const Header = styled.div`
  display: flex;
  width: 300px;
  padding: 8px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid ${(props) => props.theme.Gray3};
`;
type TextBtnProp = {
  selected: boolean;
};
const TextBtn = styled.button<TextBtnProp>`
  display: flex;
  background: white;
  font-weight: ${(props) => (props.selected ? 600 : 400)};
  border: none;
  cursor: pointer;
  margin-right: 16px;
`;
const GroupFindContainer = styled.div``;
const IntroText = styled.h1`
  margin-bottom: 32px;
`;
const GroupCatagoryContainer = styled.div`
  display: grid;
  width: 100%;
  grid-auto-rows: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

const MentorFindContainer = styled.div``;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 100%;
`;

const DynamicImage = styled.img`
  height: 400px;
  object-fit: cover;
`;

const dummy = [
  {
    id: 1,
    name: '대외활동',
    url:
      'https://neighborly-ash-fed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffa5e9a6d-7bd4-4fb7-8c6d-11db223703d1%2Ficon-activity.png?table=block&id=43e802c2-b572-4766-baa9-2bba12acf767&spaceId=1e190b35-e398-4c80-9518-9c3889034187&width=1020&userId=&cache=v2',
  },
  {
    id: 2,
    name: '공모전',
    url:
      'https://neighborly-ash-fed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F1902d710-3265-4407-a921-c1a92c19cef8%2Ficon-competition.png?table=block&id=d1e8f407-06ac-4eb5-a49b-b318b9ff059b&spaceId=1e190b35-e398-4c80-9518-9c3889034187&width=1020&userId=&cache=v2',
  },
  {
    id: 3,
    name: '스터디',
    url:
      'https://neighborly-ash-fed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F075b46f8-ebd6-43ef-80b0-1cc1f2c6ebe0%2Ficon-study.png?table=block&id=45def0e6-f405-4184-93d8-ee69afa3ea23&spaceId=1e190b35-e398-4c80-9518-9c3889034187&width=1020&userId=&cache=v2',
  },
  {
    id: 4,
    name: '동아리',
    url:
      'https://neighborly-ash-fed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6bf20af7-65f2-42eb-ad01-40ab9bf27f2b%2Ficon-club.png?table=block&id=740f238e-743b-4d2c-959c-165d132de99c&spaceId=1e190b35-e398-4c80-9518-9c3889034187&width=1020&userId=&cache=v2',
  },
  {
    id: 5,
    name: '면접',
    url:
      'https://neighborly-ash-fed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F996a8113-fa0d-4e7b-ba37-c877e73cac3a%2Ficon-interview.png?table=block&id=401db8c1-6191-4ce5-91f6-8891aa72581c&spaceId=1e190b35-e398-4c80-9518-9c3889034187&width=1020&userId=&cache=v2',
  },
  {
    id: 6,
    name: '프로젝트',
    url:
      'https://neighborly-ash-fed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F05e1fee8-1d79-4b3a-97c3-02afdfa24032%2Ficon-project.png?table=block&id=b8f9ef6d-bc94-4888-9ea9-59cd8016a820&spaceId=1e190b35-e398-4c80-9518-9c3889034187&width=1020&userId=&cache=v2',
  },
  {
    id: 7,
    name: '구인/구직',
    url:
      'https://neighborly-ash-fed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb78df422-e081-4a01-ac85-c93aec561bac%2Ficon-job.png?table=block&id=a1bdd29b-e96f-4a7c-957c-f2dfec6f82d5&spaceId=1e190b35-e398-4c80-9518-9c3889034187&width=1020&userId=&cache=v2',
  },
  {
    id: 8,
    name: '기타',
    url:
      'https://neighborly-ash-fed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F162b1684-f42a-4dbf-ada6-0015627bfa65%2Ficon-etc.png?table=block&id=5bc7f5d5-c603-45b1-ae84-a5a8c19ea7f9&spaceId=1e190b35-e398-4c80-9518-9c3889034187&width=1020&userId=&cache=v2',
  },
];

export default MainPage;
