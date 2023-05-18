import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50px;
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const MostUsedBlock = styled.div`
  background-color: rgba(240, 111, 247, .5);
  padding: 10px 10px 12px 10px;
  border-radius: 10px;
  width: 64px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;


  svg {
    font-size: 28px;
    color: white;
  }
`;