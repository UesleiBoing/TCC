import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

