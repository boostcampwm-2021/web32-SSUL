import React, { useEffect, useState } from 'react';
import CategoryInput from './CategoryInput';
import PersonnelInput from './PersonnelInput';
import TechStackInput from './TechStackInput';
import GroupInfoInput from './GroupInfoInput';
import DateInput from './DateInput';
import GageBar from './GageBar';
import CustomButton from './CustomButton';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../store/rootReducer';
import { GroupData } from '../../types/CreateGroup';
import { clearGroupData } from '../../store/slices/createGroupData';
import { Category, TechStack } from '../../types';
import { getCategories } from '../../api/category';
import { getTechStackList } from '../../api/techStack';
import { GroupCreateInterface } from '../../types/ServerData';
import { postGroupCreate } from '../../api/group';

const MAX_CONTENT_INDEX = 4;

function GroupCreatePage(): JSX.Element {
  const [contentsNumber, setContentsNumber] = useState<number>(0);
  const [notificationText, setNotificationText] = useState<string>('');
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const groupData = useSelector<ReducerType, GroupData>((state) => state.createGroupData);
  const dispatch = useDispatch();

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
        return <TechStackInput techStacks={techStacks} />;
      default:
        return null;
    }
  };

  const checkInput = () => {
    switch (contentsNumber) {
      case 0:
        return groupData.category !== '';
      case 2:
        return groupData.groupName !== '' && groupData.groupInfo !== '';
      case 3:
        return groupData.startDate !== '' && groupData.endDate !== '';
      case 4:
        return groupData.selectedTechStack.length > 0;
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
    const groupCreateData: GroupCreateInterface = {
      ownerId: 0,
      name: groupData.groupName,
      maxUserCnt: groupData.personnelCount,
      curUserCnt: 1,
      intro: groupData.groupInfo,
      startAt: groupData.startDate,
      endAt: groupData.endDate,
      category: groupData.category,
      usingTechStacks: groupData.selectedTechStack,
    };
    try {
      await postGroupCreate(groupCreateData);
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
      const response: Category[] = await getCategories();
      setCategorys(response);
    };

    const fetechTechStackList = async () => {
      const response: TechStack[] = await getTechStackList();
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
        <CustomButton
          label={'이전'}
          color={'#00C5AA'}
          backgroundColor={'#FFFFFF'}
          clickBtn={clickPrevContents}
        />
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
