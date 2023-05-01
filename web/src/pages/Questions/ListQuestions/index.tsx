import React, { useEffect, useState } from 'react';

import { Button, ButtonBase } from '@mui/material';
import { Form } from '@unform/web';
import { Link, useNavigate, useParams } from 'react-router-dom';

import DataTable from 'components/DataTable';
import Input from 'components/Form/Input';
import Title from 'components/Typography/Title';

import { useAuth } from 'hooks/auth';
import { useForm } from 'hooks/form/useForm';
import Toast from 'hooks/toast/Toast';

import Question from 'interfaces/entities/Question';
import Topic from 'interfaces/entities/Topic';

import api from 'services/api';

import { ButtonGroupEnd } from 'styles/styled-components/ButtonGroupEnd';
import { MainDefault } from 'styles/styled-components/MainDefault';

import { ButtonGroup, TitleSection } from './style';

const ListQuestions: React.FC = () => {

  const { topic: topic_id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topic, setTopic] = useState<Topic>();
  
  const handleDeleteQuestion = (e: React.MouseEvent, id:number) => {
    e.stopPropagation();

    api.delete(`/questions/${id}`)
      .then(({ data }) => {
        setQuestions(questions.filter(question => question.id !== id));
        new Toast().success('Questão deletada com sucesso!')
      })
      .catch((err) => new Toast().error('Impossível deletar a questão!'));
  }

  useEffect(() => {
    Promise.all([
      api.get(`/topics/${topic_id}/questions`).then(({ data }) => {
        setQuestions(data);
      }),
      api.get(`/topics/${topic_id}`).then(({ data }) => {
        if (!data) {
          return navigate('/topics');
        }
        setTopic(data);
      }),
    ])
  }, []);
  
  return (
    <MainDefault>
      <TitleSection>
        <Title variant='h4'> {topic?.description}</Title>
      </TitleSection>

      <ButtonGroupEnd>
        {user.isTeacher &&
          <Button component={Link} 
            variant="contained"
            to={`/topics/${topic_id}/questions/create`} 
            color='success'>
            Cadastrar
          </Button>
        }
        <Button
          type='submit'
          component={Link}
          to={`/topics`}
          variant='contained'
          color='error'>
          Voltar
        </Button>
      </ButtonGroupEnd> 
      <DataTable
        title="Questões"
        data={questions}
        metadata={[
          {
            prop: 'id',
            label: 'Código',
            primaryKey: true,
            numeric: true
          }, 
          {
            prop: 'description',
            label: 'Descrição'
          },
          {
            prop: 'weight',
            label: 'Peso',
            numeric: true
          },
          {
            prop: 'keywordQuestions',
            label: 'Palavra-chaves',
            mask: (keyQuests: any[]) => {
              const keywords = keyQuests.map(keyQuest => keyQuest.keyword.description);

              return keywords.join(', ');
            }
          }
        ]}
        actions={({ id }) => (
          <>
            <Button component={Link}
              to={`/topics/${topic_id}/questions/${id}`}
              variant="contained"
              color='secondary'>
              Editar
            </Button>

            <Button onClick={(e) => handleDeleteQuestion(e, id)}
              type='button'
              variant="contained"
              color='error'>
              Remover
            </Button>
          </>
        )}
      />

    </MainDefault>
  );
};

export default ListQuestions;
