import React, { useCallback, useEffect, useState } from 'react';

import { Button, Switch, Typography }                                from '@mui/material';
import { Form }                                  from '@unform/web';
import { FiLock, FiMail }                        from 'react-icons/fi';
import { useNavigate }                           from 'react-router-dom';
import { Link }                                  from 'react-router-dom';

import Checkbox from 'components/Form/Checkbox';
import Input from 'components/Form/Input';
import SubHead from 'components/Typography/SubHead';
import Title from 'components/Typography/Title';

import { useAuth } from 'hooks/auth';
import { useForm } from 'hooks/form/useForm';
import { useSettings } from 'hooks/settings';
import Toast from 'hooks/toast/Toast';


import { AnimationContainer, Background, Container, Content, SwitchBox } from './styles';
import { schema } from './validation/schema';

interface ISignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  
  const form = useForm({ schema });	

  const [isTeacher, setIsTeacher] = useState(false);

  const handleSubmit = useCallback(
    async (data: ISignInFormData) => {
      
      await form.validation(data);

      const toast = new Toast().loading();

      try {
        await signIn({ isTeacher, ...data });
        
        if (isTeacher) {
          navigate('/ranking');
        } else {
          navigate('/dashboard');
        }
        
        toast.dismiss();
      } catch (error) {
        
        toast.error('There was an error logging in, check your credentials.')                
      }
    },
    [navigate, signIn, isTeacher],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>

          <Form ref={form.ref} onSubmit={handleSubmit}>

            <Title variant="h4">
              Entrar
            </Title>
            <SubHead mb={3}>
              Faça seu login para acessar o sistema
            </SubHead>

            <Input type="text" 
              name="email" 
              icon={FiMail} 
              label="Email" 
              placeholder='abc@gmail.com' 
              mb={1} 
            />
            
            <Input type="password" 
              name="password"
              icon={FiLock}
              label="Senha" 
              mb="1" 
            />

            <SwitchBox>
              <Switch checked={isTeacher} onChange={() => setIsTeacher(!isTeacher)}/> 
              <Typography variant="body1" >
                {isTeacher ? 'Professor' : 'Aluno'}
              </Typography>
            </SwitchBox>

            <Button fullWidth size="large" sx={{ mt: 3 }} variant="contained" type='submit' color='primary' >
              Acessar
            </Button>
            
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              color="primary"
              component={Link}
              to="/sign-up"
            >
              Criar Conta
            </Button>
            
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
