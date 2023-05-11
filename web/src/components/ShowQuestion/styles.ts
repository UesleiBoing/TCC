import styled from 'styled-components';

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