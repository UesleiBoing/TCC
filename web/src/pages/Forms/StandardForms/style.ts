import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

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

export const QuestionsSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  gap:10px;
`;

interface QuestionCardProps {
  isSelected: boolean;
}
export const QuestionCard = styled.div<QuestionCardProps>`
  border: 1px solid black;
  border-radius: 10px;
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => !props.isSelected && css`
    border: 1px solid red;
    box-shadow: 0px 0px 1px 1px rgba(255,0,0,.5);
  `}
`;

export const QuestionTitle = styled.p`
`;
