import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

import { primaryColor } from '../../styles/variables';

const appearFromLeft = keyframes`
from {
  opacity: 0;
  transform: translateX(-50px);
}

to {
  opacity: 1;
  transform: translateX(0);
}
`;

export const Container = styled.div`
  height: 100vh;
  justify-content: center;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;

  animation: ${appearFromLeft} 1s;

  @media screen and (max-width: 600px) {
    img {
      width: 98vw;
      margin-left: 1vw;
    }
  }
  
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

  }

  > a {
    color: ${primaryColor};
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, primaryColor)};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background-size: cover;
`;

export const SwitchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

