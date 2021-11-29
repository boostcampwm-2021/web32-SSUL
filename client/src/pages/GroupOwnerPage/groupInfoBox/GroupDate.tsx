import React, { useState } from 'react';
import styled from '@emotion/styled';
import { DatePicker } from '@components';
import { useAppDispatch, useAppSelector, useToast } from '@hooks';
import { selectGroupAdminData, setGroupAdminData } from '@store/group/adminSlice';
import { groupOwnerHttpClient } from '@api';
import { DATE_INTRO, DATE_TITLE } from '@constants/consts';

function GroupDate(): JSX.Element {
  const [toastify] = useToast();
  const { groupId, startAt, endAt } = useAppSelector(selectGroupAdminData);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const setDate = (startAt: string, endAt: string) => {
    dispatch(setGroupAdminData({ startAt, endAt }));
  };

  const handleEditButtonClick = () => {
    if (isEdit) {
      if (startAt === '' || endAt === '') {
        toastify(DATE_INTRO, 'ERROR');
        return;
      }
      dispatch(setGroupAdminData({ startAt, endAt }));
      groupOwnerHttpClient.updateGroupDate({ gid: groupId, startAt, endAt });
    }

    setIsEdit(!isEdit);
  };

  return (
    <Container>
      <Header>
        <BoxTitle>{DATE_TITLE}</BoxTitle>
        <EditButton onClick={handleEditButtonClick}>{isEdit ? '저장' : '편집'}</EditButton>
      </Header>
      {isEdit ? (
        <DatePickerContainer>
          <DatePicker startAt={startAt} endAt={endAt} setDate={setDate} />
        </DatePickerContainer>
      ) : (
        <Text>{`${startAt} - ${endAt}`}</Text>
      )}
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px auto;
`;

const BoxTitle = styled.p`
  padding: 0;
  margin: 0 0 15px 10px;
  font-size: 16px;
  font-weight: bold;
`;

const EditButton = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 5px;
  margin: 0 5px 15px 0;
  background-color: ${(props) => props.theme.Primary};
  color: ${(props) => props.theme.White};
  box-shadow: 0px 3px 5px #8f8f8f, -5px -5px 10px #ffffff;
  &:active {
    box-shadow: inset 5px 5px 10px #8f8f8f, inset -5px -5px 10px #ffffff;
  }
`;

const DatePickerContainer = styled.div`
  width: 530px;
  margin: auto;
`;

const Text = styled.p`
  width: 520px;
  margin: 10px 10px;
  line-height: 30px;
  white-space: pre-wrap;
  word-break: break-all;
  overflow: auto;
`;
export default GroupDate;
