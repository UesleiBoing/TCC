import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ButtonBlock = styled.div`
  background-color: #d32f2f;
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

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50px;
`;

export const PendentTestElementTable = styled.span`
  color: red;
  font-weight: 700;
  font-size: 1rem;

  &::after {
    content: "Pendente";
  }
`;