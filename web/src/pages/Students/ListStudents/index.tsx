import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import DataTable from 'components/DataTable';

import Student from 'interfaces/entities/Student';

import api from 'services/api';

import { ButtonGroupEnd } from 'styles/styled-components/ButtonGroupEnd';
import { MainDefault } from 'styles/styled-components/MainDefault';

const ListStudents: React.FC = () => {

  const [students, setStudents] = useState<Student[]>([]);
  
  useEffect(() => {
    api.get('/students').then(({ data }) => {
      setStudents(data);
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
        title="Estudantes"
        data={students}
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

export default ListStudents;
