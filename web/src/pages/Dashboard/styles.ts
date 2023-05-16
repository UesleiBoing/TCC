import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { primaryColor, textColor } from '../../styles/variables';

export const ContainerDemonstracao = styled.div`
  padding: 30px;
  margin-bottom: 10px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const MaxSize = styled.div`
  width: 600px;
`;
  
export const TitleClass = styled.div`
  background-color: #448aff;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
  width: 100%;
  margin-top: 10px;
`;

interface TypeIcon {
  typeicon: string;
}
export const Situation = styled(Link)<TypeIcon>`
  width: 30px;

  ${props => props.typeicon !== 'open' && css`
      pointer-events: none;
    `}
  svg {
    color: #007aff;
    font-size: 30px;

  }
`;

