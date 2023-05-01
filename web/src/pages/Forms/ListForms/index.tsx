import React, { useEffect, useState } from 'react';

import { Button, ButtonBase } from '@mui/material';
import { Link } from 'react-router-dom';

import DataTable from 'components/DataTable';

import { useAuth } from 'hooks/auth';
import Toast from 'hooks/toast/Toast';

import Topic from 'interfaces/entities/Topic';

import api from 'services/api';

import { ButtonGroupEnd } from 'styles/styled-components/ButtonGroupEnd';
import { MainDefault } from 'styles/styled-components/MainDefault';

import { ButtonGroup } from './style';

const ListTopicsForms: React.FC = () => {

  const [topics, setTopics] = useState<Topic[]>([]);
  
  const { user } = useAuth();
  
  const handleDeleteTopic = (e: React.MouseEvent, id:number) => {
    e.stopPropagation();

    api.delete(`/topics/${id}`)
      .then(({ data }) => {
        setTopics(topics.filter(topic => topic.id !== id));
        new Toast().success('Tópico deletado com sucesso!')
      })
      .catch((err) => new Toast().error('Impossível deletar o tópico!'));
  }

  useEffect(() => {
    if (user.isTeacher) {
      api.get('/topics').then(({ data }) => {
        setTopics(data);
      });
      return;
    }

    api.get(`/topics/of-student/${user.id}`).then(({ data }) => {
      setTopics(data);
    });
  }, []);
  
  return (
    <MainDefault>
      <ButtonGroupEnd>
        <Button
          type='submit'
          component={Link}
          to='/dashboard'
          variant='contained'
          color='error'>
          Voltar
        </Button>
      </ButtonGroupEnd>
      <DataTable
        title="Tópicos"
        data={topics}
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
            prop: 'classes.title',
            label: 'Classe'
          },
        ]}
        haveActions={user.isTeacher}
        actions={({ id }) => (
          <>
            <Button component={Link}
              to={`/topics/${id}/standard-form`}
              variant="contained"
              color='info'
            >
              Formulário Padrão
            </Button>
            
            <Button component={Link}
              to={`/topics/${id}/generate-form`}
              variant="contained"
              color='warning'
            >
              Formulário
            </Button>
          </>

        )}
      />

    </MainDefault>
  );
};

export default ListTopicsForms;
