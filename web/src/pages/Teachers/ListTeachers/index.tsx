import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import DataTable from 'components/DataTable';

import Teacher from 'interfaces/entities/Teacher';

import api from 'services/api';

import { ButtonGroupEnd } from 'styles/styled-components/ButtonGroupEnd';
import { MainDefault } from 'styles/styled-components/MainDefault';

const ListTeachers: React.FC = () => {

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  
  useEffect(() => {
    api.get('/teachers').then(({ data }) => {
      setTeachers(data);
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
        title="Professores"
        data={teachers}
        metadata={[
          {
            prop: 'id',
            label: 'Código',
            primaryKey: true,
            numeric: true
          }, 
          {
            prop: 'name',
            label: 'Nome'
          },
          {
            prop: 'email',
            label: 'Email'
          },
        ]}
      />
    </MainDefault>
  );
};

export default ListTeachers;
