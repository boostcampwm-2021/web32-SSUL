import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import CategoryItem from './CategoryItem';
import { CenterLayout } from '../../styles/global';
import { LinkButton } from '../../components';
import DeveloperImg from '../../assets/images/developer-img.jpg';
import { getCategories } from '../../api/category';
import { Category } from '../../types/Category';

const Tab = Object.freeze({
  GROUP: 'GROUP',
  MENTOR: 'MENTOR',
});

function MainPage(): JSX.Element {
  const [tab, setTab] = useState(Tab.GROUP);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleMentorTabClick = () => setTab(Tab.MENTOR);
  const handleGroupTabClick = () => setTab(Tab.GROUP);

  return (
    <CenterLayout>
      <InfoContainer>
        <Header>
          <TextBtn selected={tab === Tab.GROUP} onClick={handleMentorTabClick}>
            그룹 찾기
          </TextBtn>
          <TextBtn selected={tab === Tab.MENTOR} onClick={handleGroupTabClick}>
            멘토 찾기
          </TextBtn>
        </Header>

        {tab === Tab.GROUP && (
          <GroupFindContainer>
            <IntroText>함께 성장할 동료를 찾아보세요!</IntroText>
            <GroupCatagoryContainer>
              {categories.map(({ id, name, imageUrl }) => (
                <CategoryItem key={id} id={id} name={name} url={imageUrl} />
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

export default MainPage;
