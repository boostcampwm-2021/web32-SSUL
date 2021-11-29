import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import CategoryItem from './CategoryItem';
import { BaseLayout } from '@styles';
import { LinkButton } from '../../components';
import DeveloperImg from '../../assets/images/developer-img.jpg';
import { categoryHttpClient } from '@api';
import { Category } from '../../types/Category';
import {
  MENTOR_RECRUIT,
  GROUP_RECRUIT,
  MAIN_MENTOR_INTRO1,
  MAIN_MENTOR_INTRO2,
  MAIN_GROUP_INTRO,
  MENTOR_SEARCH,
} from '@constants/consts';
import { Tab } from '@constants/enums';

function MainPage(): JSX.Element {
  const [tab, setTab] = useState(Tab.GROUP);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await categoryHttpClient.getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleMentorTabClick = () => setTab(Tab.MENTOR);
  const handleGroupTabClick = () => setTab(Tab.GROUP);

  return (
    <BaseLayout>
      <Container>
        <InfoContainer>
          <Header>
            <TextBtn selected={tab === Tab.GROUP} onClick={handleGroupTabClick}>
              {GROUP_RECRUIT}
            </TextBtn>
            <TextBtn selected={tab === Tab.MENTOR} onClick={handleMentorTabClick}>
              {MENTOR_RECRUIT}
            </TextBtn>
          </Header>

          {tab === Tab.GROUP && (
            <GroupFindContainer>
              <IntroText>{MAIN_GROUP_INTRO}</IntroText>
              <GroupCatagoryContainer>
                {categories.map(({ id, name, imageUrl }) => (
                  <CategoryItem key={id} id={id} name={name} url={imageUrl} />
                ))}
              </GroupCatagoryContainer>
            </GroupFindContainer>
          )}
          {tab === Tab.MENTOR && (
            <MentorFindContainer>
              <IntroText>{MAIN_MENTOR_INTRO1}</IntroText>
              <IntroText>{MAIN_MENTOR_INTRO2}</IntroText>
              <LinkButton to="/recruit/mentor" width={300} height={50}>
                {MENTOR_SEARCH}
              </LinkButton>
            </MentorFindContainer>
          )}
        </InfoContainer>

        <ImageWrapper>
          <DynamicImage src={DeveloperImg} alt="devloper" />
        </ImageWrapper>
      </Container>
    </BaseLayout>
  );
}
const Container = styled.div`
  display: flex;
  margin: 200px auto;
`;

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
  background: ${(props) => props.theme.White};
  font-weight: ${(props) => (props.selected ? 600 : 400)};
  border: none;
  cursor: pointer;
  margin-right: 16px;
`;
const GroupFindContainer = styled.div``;
const IntroText = styled.h1`
  margin-bottom: 4px;
`;
const GroupCatagoryContainer = styled.div`
  display: grid;
  width: 100%;
  margin-top: 24px;
  grid-auto-rows: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

const MentorFindContainer = styled.div``;

const ImageWrapper = styled.div`
  display: flex;
  width: 400px;
`;

const DynamicImage = styled.img`
  height: 400px;
  object-fit: cover;
`;

export default MainPage;
