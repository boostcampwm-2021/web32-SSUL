import React, { useEffect, useState } from 'react';
import CategoryInput from './CategoryInput';
import PersonnelInput from './PersonnelInput';
import TechStackInput from './TechStackInput';
import GroupInfoInput from './GroupInfoInput';
import DateInput from './DateInput';
import GageBar from './GageBar';
import CustomButton from './CustomButton';
import styled from '@emotion/styled';
import { clearGroupData, groupCreateDataState, setGroupData } from '@store/slices/groupCreateDataSlice';
import { Category, TechStack } from '@types';
import { categoryHttpClient } from '@api';
import { techStackHttpClient } from '@api';
import { groupHttpClient } from '@api';
import { useAppDispatch, useAppSelector } from '@hooks';

const MAX_CONTENT_INDEX = 4;

function GroupCreatePage(): JSX.Element {
  const [contentsNumber, setContentsNumber] = useState<number>(0);
  const [notificationText, setNotificationText] = useState<string>('');
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const groupData = useAppSelector(groupCreateDataState);
  const dispatch = useAppDispatch();

  const setUsingTechStacks = (newTechStacks: string[]) => dispatch(setGroupData({ usingTechStacks: newTechStacks }));
  const getContents = (): JSX.Element | null => {
    switch (contentsNumber) {
      case 0:
        return <CategoryInput categorys={categorys} />;
      case 1:
        return <PersonnelInput />;
      case 2:
        return <GroupInfoInput />;
      case 3:
        return <DateInput />;
      case 4:
        return (
          <TechStackInput
            baseTechStackList={techStacks}
            usingTechStacks={groupData.usingTechStacks}
            setUsingTechStacks={setUsingTechStacks}
          />
        );
      default:
        return null;
    }
  };

  const checkInput = () => {
    switch (contentsNumber) {
      case 0:
        return groupData.category !== '';
      case 2:
        return groupData.name !== '' && groupData.intro !== '';
      case 3:
        return groupData.startAt !== '' && groupData.endAt !== '';
      case 4:
        return groupData.usingTechStacks.length > 0;
      default:
        return true;
    }
  };

  const clickPrevContents = () => {
    setNotificationText('');
    if (contentsNumber > 0) setContentsNumber(contentsNumber - 1);
  };

  const clickNextContents = () => {
    if (!checkInput()) {
      setNotificationText('필수 입력사항을 입력해주세요!');
      return;
    }

    setNotificationText('');
    if (contentsNumber < MAX_CONTENT_INDEX) setContentsNumber(contentsNumber + 1);
    else if (contentsNumber === MAX_CONTENT_INDEX) requestGroupCreate();
  };

  const requestGroupCreate = async () => {
    try {
      await groupHttpClient.postGroupCreate(groupData);
      window.location.href = '/';
    } catch (e) {
      console.log(e);
    }
  };
  const cleanUp = () => {
    dispatch(clearGroupData());
  };

  useEffect(() => {
    const fetchCategoryList = async () => {
      const response: Category[] = await categoryHttpClient.getCategories();
      setCategorys(response);
    };

    const fetechTechStackList = async () => {
      const response: TechStack[] = await techStackHttpClient.getTechStackList();
      setTechStacks(response);
    };

    fetchCategoryList();
    fetechTechStackList();

    return () => cleanUp();
  }, []);

  return (
    <CreateForm>
      <GageBar contentsNumber={contentsNumber} />
      <ContentsContainer>{getContents()}</ContentsContainer>
      <Notification>{notificationText}</Notification>
      <ButtonWrapper>
        <CustomButton label={'이전'} color={'#00C5AA'} backgroundColor={'#FFFFFF'} clickBtn={clickPrevContents} />
        <CustomButton
          label={contentsNumber === MAX_CONTENT_INDEX ? '완료' : '다음'}
          color={'#FFFFFF'}
          backgroundColor={'#00C5AA'}
          clickBtn={clickNextContents}
        />
      </ButtonWrapper>
    </CreateForm>
  );
}

const CreateForm = styled.div`
  position: relative;
  padding: 20px;
  margin: 70px auto 0 auto;
  width: 600px;
  height: 500px;
  box-shadow: 20px 20px 40px 4px rgba(41, 36, 36, 0.25), -20px -20px 0px 6px #ffffff;
  border-radius: 40px;
`;

const ContentsContainer = styled.div`
  margin: auto;
  height: 400px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 40px;
  display: flex;
`;

const Notification = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 13px;
  margin-left: 40px;
  margin-bottom: 40px;
  color: #e50707;
`;
export default GroupCreatePage;
