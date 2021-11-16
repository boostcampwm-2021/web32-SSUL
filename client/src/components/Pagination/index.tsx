import React from 'react';
import styled from '@emotion/styled';

interface PaginationProps {
  totalPages: number;
  curPage: number;
}

const PAGE_OFFSET_CNT = 5;

function Pagination({ totalPages, curPage }: PaginationProps): JSX.Element {
  const firstPageNumber = Math.floor((curPage - 1) / PAGE_OFFSET_CNT) * PAGE_OFFSET_CNT + 1;
  const lastPageNumber =
    firstPageNumber + PAGE_OFFSET_CNT - 1 > totalPages
      ? totalPages
      : firstPageNumber + PAGE_OFFSET_CNT - 1;
  const pageCnt: number = lastPageNumber - firstPageNumber + 1;

  function range(numCnt: number, start = 1) {
    return [...Array.from(Array(numCnt).keys())].map((idx) => idx + start);
  }

  const renderPagination = range(pageCnt, firstPageNumber).map((pageNum: number) => {
    return <div key={pageNum}>{pageNum}</div>;
  });

  return <Container>{renderPagination}</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default Pagination;
