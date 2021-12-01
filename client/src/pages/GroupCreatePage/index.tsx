import React, { useEffect, useState } from 'react';
import CategoryInput from './CategoryInput';
import PersonnelInput from './PersonnelInput';
import TechStackInput from './TechStackInput';
import GroupInfoInput from './GroupInfoInput';
import DateInput from './DateInput';
import GageBar from './GageBar';
import CustomButton from './CustomButton';
import styled from '@emotion/styled';
import { clearGroupData, groupCreateDataState, setGroupData } from '@store/group/makerSlice';
import { Category, TechStack } from '@types';
import { categoryHttpClient } from '@api';
import { techStackHttpClient } from '@api';
import { groupHttpClient } from '@api';
import { useAppDispatch, useAppSelector, useToast } from '@hooks';
import { selectUser } from '@store/user/globalSlice';
import { MSG_GROUP_CREATE_ERROR, MSG_NEED_INFO, MAX_CONTENT_INDEX } from '@constants/consts';
import { GroupCreatePageEnum } from '@constants/enums';

function GroupCreatePage(): JSX.Element {
  const [contentsNumber, setContentsNumber] = useState<number>(0);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const groupData = useAppSelector(groupCreateDataState);
  const { id: ownerId } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [toastify] = useToast();

  const setUsingTechStacks = (newTechStacks: TechStack[]) =>
    dispatch(setGroupData({ techStacks: newTechStacks }));
  const getContents = (): JSX.Element | null => {
    switch (contentsNumber) {
      case GroupCreatePageEnum.CATEGORY:
        return <CategoryInput categorys={categorys} />;
      case GroupCreatePageEnum.PERSONNEL:
        return <PersonnelInput />;
      case GroupCreatePageEnum.GROUP_INFO:
        return <GroupInfoInput />;
      case GroupCreatePageEnum.DATE:
        return <DateInput />;
      case GroupCreatePageEnum.TECH_STACK:
        return (
          <TechStackInput
            baseTechStackList={techStacks}
            usingTechStacks={groupData.techStacks}
            setUsingTechStacks={setUsingTechStacks}
          />
        );
      default:
        return null;
    }
  };

  const checkInput = () => {
    switch (contentsNumber) {
      case GroupCreatePageEnum.CATEGORY:
        return groupData.categoryId !== 0;
      case GroupCreatePageEnum.GROUP_INFO:
        return groupData.name !== '' && groupData.intro !== '';
      case GroupCreatePageEnum.DATE:
        return groupData.startAt !== '' && groupData.endAt !== '';
      case GroupCreatePageEnum.TECH_STACK:
        return groupData.techStacks.length > 0;
      default:
        return true;
    }
  };

  const clickPrevContents = () => {
    if (contentsNumber > GroupCreatePageEnum.CATEGORY) setContentsNumber(contentsNumber - 1);
    else window.history.back();
  };

  const clickNextContents = () => {
    if (!checkInput()) {
      toastify(MSG_NEED_INFO, 'INFO');
      return;
    }

    if (contentsNumber < MAX_CONTENT_INDEX) setContentsNumber(contentsNumber + 1);
    else if (contentsNumber === MAX_CONTENT_INDEX) requestGroupCreate();
  };

  const requestGroupCreate = async () => {
    try {
      if (!ownerId) return;
      const postGroupData = { ...groupData };
      postGroupData.ownerId = ownerId;
      await groupHttpClient.postGroupCreate(postGroupData);
      window.location.href = '/';
    } catch (e) {
      toastify(MSG_GROUP_CREATE_ERROR, 'ERROR');
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
      <ButtonWrapper>
        <CustomButton label={'이전'} clickBtn={clickPrevContents} />
        <CustomButton
          label={contentsNumber === MAX_CONTENT_INDEX ? '완료' : '다음'}
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
  box-shadow: ${(props) => props.theme.Shadow};
  background-color: ${(props) => props.theme.Box};
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
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin: 0 40px 40px 0;
`;

export default GroupCreatePage;
