import styled from '@emotion/styled';
import React from 'react';
import { groupCreateDataState, setGroupData } from '@store/slices/groupCreateDataSlice';
import { useAppDispatch, useAppSelector } from '@hooks';

function PersonnelInput(): JSX.Element {
  const { personnelCount } = useAppSelector(groupCreateDataState);
  const dispatch = useAppDispatch();
  const onChangeBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    dispatch(setGroupData({ personnelCount: value }));
  };

  return (
    <>
      <Title>그룹의 정원을 선택해주세요.</Title>
      <RangeValue>{personnelCount}</RangeValue>
      <RangeBar type="range" min="1" max="30" onChange={onChangeBar} value={personnelCount} />
    </>
  );
}

const Title = styled.p`
  margin: 30px;
`;

const RangeBar = styled.input`
  display: block;
  -webkit-appearance: none;
  background-color: ${(props) => props.theme.Gray6};
  width: 300px;
  height: 10px;
  border-radius: 5px;
  margin: 0 auto;
  outline: 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: ${(props) => props.theme.Primary};
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
    transition: all 0.3s ease;
  }
`;

const RangeValue = styled.p`
  width: 300px;
  line-height: 60px;
  font-weight: bold;
  font-size: 50px;
  margin: 40px auto;
  color: ${(props) => props.theme.Gray3};
  text-shadow: white 2px 2px 2px;
`;
export default PersonnelInput;
