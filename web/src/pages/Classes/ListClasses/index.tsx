import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import DataTable from 'components/DataTable';

import { useAuth } from 'hooks/auth';
import Toast from 'hooks/toast/Toast';

import Classe from 'interfaces/entities/Classe';

import api from 'services/api';

import { ButtonGroupEnd } from 'styles/styled-components/ButtonGroupEnd';
import { MainDefault } from 'styles/styled-components/MainDefault';

import { ButtonGroup } from './style';

interface ClassDatatable extends Classe {
  period: string;
}

const ListClasses: React.FC = () => {

  const [classes, setClasses] = useState<ClassDatatable[]>([]);
  const { user } = useAuth();
  
  const handleDeleteClasse = (e: React.MouseEvent, id:number) => {
    e.stopPropagation();

    api.delete(`/classes/${id}`)
      .then(({ data }) => {
        setClasses(classes.filter(classe => classe.id !== id));
        new Toast().success('Classe deletada com sucesso!')
      })
      .catch((err) => new Toast().error('Impossível deletar a classe!'));
  }

  useEffect(() => {
    let route = user.isTeacher 
      ? '/classes' 
      : `/classes/of-student/${user.id}`;

    api.get(route).then(({ data }) => {
      setClasses(
        data.map((classe: Classe) => {
          const period = `${classe.year}/${classe.semester}`;
  
          return { ...classe, period };
        })
      );
    });

  }, []);
  
  return (
    <MainDefault>
      <ButtonGroupEnd>
        {user.isTeacher &&
          <Button component={Link} 
            variant="contained"
            to="/classes/create" 
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
        title="Turmas"
        data={classes}
        metadata={[
          {
            prop: 'id',
            label: 'Código',
            primaryKey: true,
            numeric: true
          }, 
          {
            prop: 'title',
            label: 'Título'
          },
          {
            prop: 'period',
            label: 'Período'
          },
          {
            prop: 'teacher.name',
            label: 'Professor'
          },
          {
            prop: 'subject.title',
            label: 'Matéria'
          },
        ]}
        haveActions={user.isTeacher}
        actions={({ id }) => (
          <>
            <Button component={Link}
              to={`/classes/${id}`}
              variant="contained"
              color='secondary'>
              Editar
            </Button>

            <Button onClick={(e) => handleDeleteClasse(e, id)}
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

export default ListClasses;
