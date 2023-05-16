import React, { useEffect, useState } from 'react';

import { Button, ButtonBase } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import DataTable from 'components/DataTable';

import { useAuth } from 'hooks/auth';
import Toast from 'hooks/toast/Toast';

import Topic from 'interfaces/entities/Topic';

import api from 'services/api';

import { ButtonGroupEnd } from 'styles/styled-components/ButtonGroupEnd';
import { MainDefault } from 'styles/styled-components/MainDefault';

import { ButtonGroup } from './style';

const ListTopics: React.FC = () => {

  const [topics, setTopics] = useState<Topic[]>([]);
  
  const { user } = useAuth();
  
  const handleDeleteTopic = (e: React.MouseEvent, id:number) => {
    e.stopPropagation();

    api.delete(`/topics/${id}`)
      .then(({ data }) => {
        setTopics(topics.filter(topic => topic.id !== id));
        new Toast().success('Nível deletado com sucesso!')
      })
      .catch((err) => new Toast().error('Impossível deletar o Nível!'));
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
          {user.isTeacher &&
            <Button component={Link} 
              variant="contained"
              to="/topics/create" 
              color='success'>
              Cadastrar Nível
            </Button>
          }

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
        title="Níveis"
        data={topics}
        metadata={[ 
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
              to={`/topics/${id}/keywords`}
              variant="contained"
              color='info'
            >
              Palavras Chaves
            </Button>
            
            <Button component={Link}
              to={`/topics/${id}/questions`}
              variant="contained"
              color='warning'
            >
              Questões
            </Button>

            {
              user.isTeacher && 
              <>
                <Button component={Link}
                  to={`/topics/${id}`}
                  variant="contained"
                  color='secondary'>
                  <FiEdit />
                </Button>

                <Button onClick={(e) => handleDeleteTopic(e, id)}
                  type='button'
                  variant="contained"
                  color='error'>
                  <FaTrash />	
                </Button>
              </>
            }
            
          </>

        )}
      />

    </MainDefault>
  );
};

export default ListTopics;
