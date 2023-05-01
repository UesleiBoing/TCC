import { Button } from '@mui/material';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  margin: 20px 0 0 auto; 
  justify-content: flex-end;
  gap: 5px;
  width: 300px;
`;

export const FormContainer = styled(Form)`
  max-width: 600px;
  margin: 0 auto;
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const AnswersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;


interface AnswerProps {
  visible: boolean;
}

export const AnswerOption = styled.div<AnswerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => !props.visible && css`
    display: none;
  `}
`;

export const AnswerCheck = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const AnswerDescription = styled.div`
  padding: 5px 8px;
`;

export const ButtonRemoveAnswer = styled(Button)`
  margin-left: 5px !important;
  height: 52px;
  width: 44px !important;
  background-color: rgba(235, 64, 52, 0.8) !important;

  &:hover {
    background-color: rgba(235, 64, 52, 1) !important;
  }
 
`;
