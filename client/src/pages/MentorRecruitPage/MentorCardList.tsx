import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { BoxModal, MentorCard, Pagination } from '@components';
import {
  createdFilterdQuery,
  returnMentorRecruitFilterState,
  initFilterState,
} from '@store/mentor/filterSlice';
import { Mentor, MentorListResponse } from '@types';
import { useAppDispatch, useAppSelector, useLoader } from '@hooks';
import { mentoringHttpClient } from '@api';
import { changeGroupModalState, selectGroupModalState } from '@store/util/Slice';
import { ModalTypeEnum } from '@constants/enums';
import MentorModal from './MentorModal';
import { MENTOR_EMPTY_TEXT } from '@constants/consts';
import CryingLogoImage from '@assets/logo_crying.png';

function MentorCardList(): JSX.Element {
  const { filterdQuery, selectedPage } = useAppSelector(returnMentorRecruitFilterState);
  const [filterdMentorList, setFilterdMentorList] = useState<Mentor[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [toggleLoader] = useLoader();
  const modalType = useAppSelector(selectGroupModalState);

  useEffect(() => {
    dispatch(initFilterState());
  }, []);

  useEffect(() => {
    toggleLoader(true);
    (async () => {
      const allMentorList: MentorListResponse = await mentoringHttpClient.getFilterdMentorList(
        filterdQuery,
      );
      setFilterdMentorList(allMentorList.mentors);
      setTotalPages(allMentorList.totalPages);
      toggleLoader(false);
    })();
  }, [filterdQuery]);

  const renderMentorCards = filterdMentorList.map((mentorData: Mentor) => {
    return <MentorCard key={mentorData.id} contents={mentorData} />;
  });

  const handleModalBackgroundClick = () => dispatch(changeGroupModalState(ModalTypeEnum.NONE));

  return (
    <>
      {filterdMentorList.length === 0 ? (
        <>
          <EmptyImage src={CryingLogoImage} alt="텅 빈 화면 로고" />
          <EmptyMessage>{MENTOR_EMPTY_TEXT}</EmptyMessage>
        </>
      ) : (
        <>
          <CardList>{renderMentorCards}</CardList>
          <Pagination
            totalPages={totalPages}
            curPage={selectedPage}
            createdQuery={createdFilterdQuery}
          />
          {modalType !== ModalTypeEnum.NONE && (
            <BoxModal
              style={{ width: '550px', height: '550px' }}
              element={<MentorModal />}
              onCancel={handleModalBackgroundClick}
            />
          )}
        </>
      )}
    </>
  );
}

const CardList = styled.div`
  display: grid;
  margin: 10px auto;
  min-width: 1000px;

  grid-template-columns: repeat(3, minmax(250px, 2fr));
  grid-template-rows: repeat(auto-fit, minmax(100px, 2fr));
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: ${(props) => props.theme.Gray4};
  margin-top: 20px;
`;

const EmptyImage = styled.img`
  margin-top: 100px;

  width: 250px;
  height: 200px;
`;

export default MentorCardList;
