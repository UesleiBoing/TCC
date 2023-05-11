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
import Form from 'interfaces/entities/Form';

import api from 'services/api';

import { ButtonGroupEnd } from 'styles/styled-components/ButtonGroupEnd';
import { MainDefault } from 'styles/styled-components/MainDefault';

import { ButtonGroup, PendentTestElementTable } from './style';

interface FormsList extends Form {
  grade: string;
}
const ListTests: React.FC = () => {

  const [tests, setTests] = useState<FormsList[]>([]);
  const { user } = useAuth();
  
  useEffect(() => {
    api.get(`/forms/of-student`).then(({ data }) => {
      const forms = data.map((form: Form) => {
        return {
          ...form,
          grade: form.tests?.length  ? form.tests[0].grade : 'Pendente'
        }
      });

      setTests(forms);
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
        title="Testes"
        data={tests}
        metadata={[
          {
            prop: 'title',
            label: 'Formulário'
          },
          {
            prop: 'topic.description',
            label: 'Tópico',
          },
          {
            prop: 'topic.classes.title',
            label: 'Classe',
          },
          {
            prop: 'grade',
            label: 'Nota',
            mask: (value) => {
              if (value === 'Pendente') {
                return <PendentTestElementTable />
              }

              return parseFloat(value).toFixed(2);
            }
          },
        ]}
        actions={({ id }) => (
          <>
            <Button component={Link}
              to={`/tests/${id}`}
              variant="contained"
              color='primary'>
              <FiEdit />
            </Button>
          </>
        )}
      />

    </MainDefault>
  );
};

export default ListTests;
