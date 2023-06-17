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

export const TitleContainer = styled.div`
  text-align: center;
  margin: 20px 0;

  span.helper {
  }
`;

export const AwardContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  small {
    margin-top: -20px;
    width: 100%;
  }
  h5, small {
    text-align: center;
  }
`;

interface AwardProps {
  conquisted: boolean;
}

export const AwardImg = styled.img`
  width: 150px;
  align-self: center;
  
  ${(props: AwardProps) => !props.conquisted && css`
    opacity: .20;
  `}
`;
  