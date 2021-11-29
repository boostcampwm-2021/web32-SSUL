import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { BoxModal, GroupCard, Pagination } from '@components';
import { Group, GroupCardDetail, GroupResponse } from '@types';
import { useAppDispatch, useAppSelector, useLoader } from '@hooks';
import {
  createdFilterdQuery,
  initFilterState,
  returnGroupRecruitFilterState,
} from '@store/group/filterSlice';
import { groupHttpClient } from '@api';
import { changeGroupModalState, selectGroupModalState } from '@store/util/Slice';
import GroupModal from './GroupModal';
import { groupCardDetailState } from '@store/group/cardDetailSlice';
import { ModalTypeEnum } from '@constants/enums';

function GroupCardList(): JSX.Element {
  const { filterdQuery, selectedPage } = useAppSelector(returnGroupRecruitFilterState);
  const [filterdGroupList, setFilterdGroupList] = useState<Group[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [toggleLoader] = useLoader();
  const groupCardContetns: GroupCardDetail = useAppSelector(groupCardDetailState);
  const modalType = useAppSelector(selectGroupModalState);

  useEffect(() => {
    dispatch(initFilterState());
  }, []);

  useEffect(() => {
    toggleLoader(true);
    const getGroupsList = async () => {
      const allGroupList: GroupResponse = await groupHttpClient.getFilterdGroupList(filterdQuery);
      console.log(allGroupList);
      setFilterdGroupList(allGroupList.groups);
      setTotalPages(allGroupList.totalPages);
      toggleLoader(false);
    };
    getGroupsList();
  }, [filterdQuery]);

  const renderGroupCards = filterdGroupList.map((groupData: Group) => {
    return <GroupCard key={groupData.id} groupContents={groupData} />;
  });

  const handleModalBackgroundClick = () => dispatch(changeGroupModalState(ModalTypeEnum.NONE));

  return (
    <>
      <CardList>{renderGroupCards}</CardList>
      <Pagination
        totalPages={totalPages}
        curPage={selectedPage}
        createdQuery={createdFilterdQuery}
      />
      {modalType !== ModalTypeEnum.NONE && (
        <BoxModal
          style={{ width: '650px', height: '550px' }}
          element={<GroupModal contents={{ ...groupCardContetns }} />}
          onCancel={handleModalBackgroundClick}
        />
      )}
    </>
  );
}

const CardList = styled.div`
  display: grid;
  margin: 10px auto;
  min-width: 1000px;

  grid-template-columns: repeat(3, minmax(250px, 2fr));
  grid-template-rows: repeat(auo-fit, minmax(100px, 2fr));
`;

export default GroupCardList;
