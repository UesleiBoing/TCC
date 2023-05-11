import { Link } from 'react-router-dom';
import styled from 'styled-components';

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