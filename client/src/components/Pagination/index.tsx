import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { makeRangeNumberArray } from '@utils/Range';
import { useAppDispatch } from '@hooks';
import { checkPageNumber } from '@store/group/filterSlice';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { FIRST_PAGE_NUM, MAX_PAGE_CNT } from '@constants/consts';

interface Props {
  totalPages: number;
  curPage: number;
  createdQuery: ActionCreatorWithoutPayload<string>;
}

function Pagination({ totalPages, curPage, createdQuery }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [isFirstPageNumber, setIsFirstPageNumber] = useState<boolean>(true);
  const [isLastPageNumber, setIsLastPageNumberstate] = useState<boolean>(true);
  const firstPageNumber = Math.floor((curPage - 1) / MAX_PAGE_CNT) * MAX_PAGE_CNT + 1;
  const lastPageNumber =
    firstPageNumber + MAX_PAGE_CNT - 1 > totalPages
      ? totalPages
      : firstPageNumber + MAX_PAGE_CNT - 1;
  const pageCnt: number = lastPageNumber - firstPageNumber + 1;

  const handlePageNumberButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const number = Number(e.currentTarget.innerText);
    dispatch(checkPageNumber(number));
    dispatch(createdQuery());
  };

  const handlePrevButtonClick = () => {
    dispatch(checkPageNumber(firstPageNumber - 1));
    dispatch(createdQuery());
  };

  const handleNextButtonClick = () => {
    dispatch(checkPageNumber(lastPageNumber + 1));
    dispatch(createdQuery());
  };

  const handleMovePageButtonClick = (type: string) => {
    switch (type) {
      case 'PREV':
        return handlePrevButtonClick;
      case 'NEXT':
        return handleNextButtonClick;
      default:
        break;
    }
  };

  const renderPagination = makeRangeNumberArray(pageCnt, firstPageNumber).map((pageNum: number) => {
    if (pageNum === curPage)
      return (
        <SelectedPageNumber onClick={handlePageNumberButton} key={pageNum}>
          {pageNum}
        </SelectedPageNumber>
      );
    else
      return (
        <NonSelectedPageNumber onClick={handlePageNumberButton} key={pageNum}>
          {pageNum}
        </NonSelectedPageNumber>
      );
  });

  useEffect(() => {
    firstPageNumber === FIRST_PAGE_NUM ? setIsFirstPageNumber(true) : setIsFirstPageNumber(false);
    lastPageNumber === totalPages
      ? setIsLastPageNumberstate(true)
      : setIsLastPageNumberstate(false);
  });

  return (
    <Container>
      {!isFirstPageNumber && (
        <PageHadleButton onClick={handleMovePageButtonClick('PREV')}>{'<'}</PageHadleButton>
      )}
      {renderPagination}
      {!isLastPageNumber && (
        <PageHadleButton onClick={handleMovePageButtonClick('NEXT')}>{'>'}</PageHadleButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const PageNumber = styled.button`
  width: 40px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  box-shadow: 4px 4px 10px 0px rgba(41, 36, 36, 0.25);
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

const SelectedPageNumber = styled(PageNumber)`
  color: ${(props) => props.theme.White};
  background: ${(props) => props.theme.Primary};
`;

const NonSelectedPageNumber = styled(PageNumber)`
  color: ${(props) => props.theme.Black};
  background: ${(props) => props.theme.Gray5};
`;

const PageHadleButton = styled(PageNumber)`
  color: ${(props) => props.theme.Black};
  background: ${(props) => props.theme.Gray5};
`;

export default Pagination;
