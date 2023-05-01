import React, { useCallback, useState } from 'react';

import { Button, Switch, Typography }                                from '@mui/material';
import { Form }                                  from '@unform/web';
import { FiArrowLeft, FiLock, FiMail, FiUser }                        from 'react-icons/fi';
import { useNavigate }                           from 'react-router-dom';
import { Link }                                  from 'react-router-dom';

import Input from 'components/Form/Input';
import SubHead from 'components/Typography/SubHead';
import Title from 'components/Typography/Title';

import { useForm } from 'hooks/form/useForm';
import Toast from 'hooks/toast/Toast';


import api from 'services/api';

import { AnimationContainer, Background, Container, Content, SwitchBox } from './styles';
import { schema } from './validation/schema';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm({ schema });	

  const [isTeacher, setIsTeacher] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      
      await form.validation(data);

      const toast = new Toast().loading();

      try {
        await api.post(`/${isTeacher ? 'teachers' : 'students'}`, data);

        toast.success('Cadastro realizado com sucesso!');
        
        navigate('/');
      } catch (error) {
        toast.error('Ocorreu um erro ao enviar dados, por favor tente novamente!')                
      }
    },
    [navigate, isTeacher],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>

          <Form ref={form.ref} onSubmit={handleSubmit}>

            <Title variant="h4">
              Cadastrar
            </Title>
            <SubHead mb={3}>
              Faça o seu cadastro para poder desfrutar da plataforma!
            </SubHead>

            <Input name="name" 
              placeholder="Nome" 
              icon={FiUser} 
              mb={1} 
            />

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

            <Input type="password" 
              name="confirm_password"
              icon={FiLock}
              label="Confirme a sua Senha" 
              mb="1" 
            />

            <SwitchBox>
              <Switch value={isTeacher} onChange={() => setIsTeacher(!isTeacher)}/> 
              <Typography variant="body1" >
                Professor
              </Typography>
            </SwitchBox>

            <Button fullWidth size="large" sx={{ mt: 3 }} variant="contained" type='submit' color='primary' >
              Cadastrar
            </Button>
            
          </Form>

          <Link to="/">
            <FiArrowLeft />
            VOLTAR PARA LOGON
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignUp;
