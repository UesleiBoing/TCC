import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import DataTable from 'components/DataTable';

import { useAuth } from 'hooks/auth';
import Toast from 'hooks/toast/Toast';

import Classe from 'interfaces/entities/Classe';
import Subject from 'interfaces/entities/Subject';

import api from 'services/api';

import { ButtonGroupEnd } from 'styles/styled-components/ButtonGroupEnd';
import { MainDefault } from 'styles/styled-components/MainDefault';

import { ButtonGroup } from './style';

const ListSubjects: React.FC = () => {

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const { user } = useAuth();
  
  const handleDeleteClasse = (e: React.MouseEvent, id:number) => {
    e.stopPropagation();

    api.delete(`/subjects/${id}`)
      .then(({ data }) => {
        setSubjects(subjects.filter(subject => subject.id !== id));
        new Toast().success('Tópico deletado com sucesso!')
      })
      .catch((err) => new Toast().error('Impossível deletar o tópico!'));
  }

  useEffect(() => {
    if (user.isTeacher) {
      api.get('/subjects').then(({ data }) => {
        setSubjects(data);
      });
      return;
    }

    api.get(`/subjects/of-student/${user.id}`).then(({ data }) => {
      setSubjects(data);
    });
  }, []);

  return (
    <MainDefault>
      <ButtonGroupEnd>            
        {user.isTeacher &&
          <Button component={Link} 
            variant="contained"
            to="/subjects/create" 
            color='success'>
            Cadastrar
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
        title="Matérias"
        data={subjects}
        metadata={[
          {
            prop: 'title',
            label: 'Título'
          },
          {
            prop: 'content',
            label: 'Conteúdo'
          },
        ]}
        haveActions={user.isTeacher}
        actions={({ id }) => (
          <>
            <Button component={Link}
              to={`/subjects/${id}`}
              variant="contained"
              color='secondary'>
              <FiEdit />
            </Button>

            <Button onClick={(e) => handleDeleteClasse(e, id)}
              type='button'
              variant="contained"
              color='error'>
              <FaTrash />
            </Button>
          </>
        )}
      />

    </MainDefault>
  );
};

export default ListSubjects;
