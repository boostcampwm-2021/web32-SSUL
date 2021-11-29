import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import CategoryItem from './CategoryItem';
import { BaseLayout } from '@styles';
import { LinkButton } from '../../components';
import MainImage from './MainImage';
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
          <MainImage />
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
  width: 580px;
`;
const Header = styled.div`
  display: flex;
  width: 300px;
  padding-top: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${(props) => props.theme.Gray3};
`;
type TextBtnProp = {
  selected: boolean;
};
const TextBtn = styled.button<TextBtnProp>`
  display: flex;
  background: ${(props) => props.theme.Background};
  font-weight: ${(props) => (props.selected ? 700 : 400)};
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: ${(props) => (props.selected ? `1px soild ${props.theme.Black}` : 'none')};
  cursor: pointer;
  font-size: 1.025rem;
  margin-right: 16px;
`;
const GroupFindContainer = styled.div``;

const IntroText = styled.span`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
  display: block;
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
  position: relative;
  display: flex;
  width: 400px;
`;

export default MainPage;
