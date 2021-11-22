import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

type Props = {
  width: number;
  height: number;
};

const LinkButton = styled(Link)<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  color: ${(props) => props.theme.White};
  background-color: ${(props) => props.theme.Primary};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
`;

export default LinkButton;
