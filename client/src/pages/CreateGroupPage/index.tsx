import React, { useState } from 'react';
import Category from './Category';
import Personnel from './Personnel';
import TechStack from './TechStack';
import GroupInfo from './GroupInfo';
import Date from './Date';
import GageBar from './GageBar';
import CustomButton from './CustomButton';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../store/rootReducer';
import { GroupData } from '../../types/CreateGroup';

const MAX_CONTENT_INDEX = 4;

function CreateGroupPage(): JSX.Element {
  const [contentsNumber, setContentsNumber] = useState<number>(0);
  const [notificationText, setNotificationText] = useState<string>('');
  const groupData = useSelector<ReducerType, GroupData>((state) => state.createGroupInfo);

  const getContents = (): JSX.Element | null => {
    switch (contentsNumber) {
      case 0:
        return <Category />;
      case 1:
        return <Personnel />;
      case 2:
        return <GroupInfo />;
      case 3:
        return <Date />;
      case 4:
        return <TechStack />;
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
        return <TechStack />;
      default:
        return true;
    }
  };
  const clickPrevContents = () => {
    if (contentsNumber > 0) setContentsNumber(contentsNumber - 1);
  };

  const clickNextContents = () => {
    if (!checkInput()) {
      setNotificationText('필수 입력사항을 입력해주세요!');
      return;
    }

    setNotificationText('');
    if (contentsNumber < MAX_CONTENT_INDEX) setContentsNumber(contentsNumber + 1);
  };

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
export default CreateGroupPage;
