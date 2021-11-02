import React from 'react';
import styled from "@emotion/styled";

function GageBar(): JSX.Element {
  return(
    <>
      <GageContainer>
        <GageProgressBar/>
      </GageContainer>
      <GagePercentage>50%</GagePercentage>
    </>
  )
}

const GageContainer = styled.div`
  width: 70%;
  height: 10px;
  margin: auto;
  border-radius: 10px;
  background-color: ${(props) => props.theme.Gray6};
`;

const GageProgressBar = styled.div`
  width: 50%;
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.Primary};
`;

const GagePercentage = styled.p`
  margin-top: 10px;
  text-align: center;
`;

export default GageBar;
