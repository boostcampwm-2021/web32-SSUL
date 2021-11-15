import React from 'react';
import styled from '@emotion/styled';

interface GageProps {
  contentsNumber: number;
}

function GageBar({ contentsNumber }: GageProps): JSX.Element {
  const percentage = Math.floor(((contentsNumber + 1) / 5) * 100);
  const style = { width: `${percentage}%` };
  return (
    <>
      <GageContainer>
        <GageProgressBar style={style} />
      </GageContainer>
      <GagePercentage>{percentage}%</GagePercentage>
    </>
  );
}

const GageContainer = styled.div`
  width: 70%;
  height: 10px;
  margin: auto;
  border-radius: 10px;
  background-color: ${(props) => props.theme.Gray6};
`;

const GageProgressBar = styled.div`
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.Primary};
  transition: width 0.6s ease;
`;

const GagePercentage = styled.p`
  font-weight: bold;
  color: ${(props) => props.theme.Primary};
  margin-top: 10px;
  text-align: center;
`;

export default GageBar;
