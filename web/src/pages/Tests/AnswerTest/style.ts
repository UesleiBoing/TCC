import { Button } from '@mui/material';
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

export const TestSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;

  .title {
    font-size: 24px;
    color: black;
    margin-bottom: 10px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: top;
`;


interface AnswerProps {
  visible: boolean;
}

export const AnswerOption = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;

  color:black;
  font-size: 20px;
  line-height: 1.5;
  
  margin-bottom: 5px;
`;

export const AnswerCheck = styled.div`
`;

export const AnswerDescription = styled.div`
  padding: 5px 8px;
`;

interface WarningAnswerProps {
  success: boolean;
}

export const WarningAnswer = styled.div<WarningAnswerProps>`
  position: fixed;
  width: calc(100vw - 1.25rem - 10px - 2px);
  min-height: 200px;
  bottom: 0;

  box-shadow: none;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  margin: 5px;

  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-size: 1.2rem;
    margin-bottom: 7px;
  }

  ${props => props.success && css`
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;

    button {
      background-color: #155724 !important;
    }
  `}

  ${props => !props.success && css`
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    
    button {
      background-color: #721c24 !important;
    }
  `}

`;


export const DescriptionHolder = styled.div`
  padding-bottom: 10px;
`;

export const BtnHolder = styled.div``;

export const BtnSend = styled(Button)``;


export const ShowFinalGrade = styled.div`
  position: absolute;
  box-sizing: border-box;
  margin: 10px;
  width: calc(100vw - 20px) !important;
  height: calc(94vh - 20px) !important;
  border-radius: 35px;
  border: 1px solid rgba(240, 111, 247, .5);
  padding: 20px;
  text-align: center;

  background-color: rgba(255,255,255, .3);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  
  #main-grade-content {
    padding-top: 15vh;
    gap: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export const BigCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 55vw;
  height: 55vw;
  border-radius: 50%;
  border: 5px solid rgba(226, 63, 235, .5);
`;

export const FinalGradeButtonGroup = styled.div`
  width: 80vw;
`;

export const SmallCircle = styled.div`
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  border: 2px solid rgba(246, 172, 250, .5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .actual-grade {
    font-size: 4rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
  }

  .possible-grade {
    font-size: 2rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
  }
`;
