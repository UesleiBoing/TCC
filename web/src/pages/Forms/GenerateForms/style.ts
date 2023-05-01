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

