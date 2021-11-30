import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import firstMainImage from '../../assets/images/img_main1.svg';
import secondMainImage from '../../assets/images/img_main2.svg';
import thirdMainImage from '../../assets/images/img_main3.svg';
import fourthMainImage from '../../assets/images/img_main4.svg';
import { ONE_SECOND, MAIN_IMAGE_CNT } from '@constants/consts';

function MainImage(): JSX.Element {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCurrent((current) => (current + 1) % MAIN_IMAGE_CNT);
    }, 4 * ONE_SECOND);
    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <>
      <DynamicImage current={current} order={0} src={firstMainImage} alt="main-image" />
      <DynamicImage current={current} order={1} src={secondMainImage} alt="main-image" />
      <DynamicImage current={current} order={2} src={thirdMainImage} alt="main-image" />
      <DynamicImage current={current} order={3} src={fourthMainImage} alt="main-image" />
    </>
  );
}

const DynamicImage = styled.img<{ current: number; order: number }>`
  position: absolute;
  top: 0px;
  height: 320px;
  opacity: ${({ current, order }) => (current === order ? 1 : 0)};

  transition: opacity 4s ease;
`;

export default MainImage;
