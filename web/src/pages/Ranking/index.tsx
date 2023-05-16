import React, { useCallback, useEffect, useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { Form as FormUnform } from '@unform/web';
import { AiOutlineShop }                                   from 'react-icons/ai';
import { FaMapMarkerAlt }                                  from 'react-icons/fa';
import { FiArrowLeft, FiLock }                             from 'react-icons/fi';
import { GiSmartphone }                                    from 'react-icons/gi';
import { HiOutlineDocumentText }                           from 'react-icons/hi';
import { MdOutlineAlternateEmail, MdOutlineDescription }   from 'react-icons/md';
import { Link, useLocation, useNavigate }                  from 'react-router-dom';

import DataTable from 'components/DataTable';
import FormBuilder from 'components/Form/FormBuilder';
import IGridField        from 'components/Form/FormBuilder/interfaces/IGridField';
import Select from 'components/Form/Select';
import IOption from 'components/Form/Select/IOption';
import Title from 'components/Typography/Title';

import { useAuth }      from 'hooks/auth';
import { useForm } from 'hooks/form/useForm';
import handleAxiosError from 'hooks/handleAxiosError';
import Toast          from 'hooks/toast/Toast';

import api from 'services/api';

import Mask from 'utils/Mask';

import { MainDefault } from 'styles/styled-components/MainDefault';

import logo from '../../assets/logo.svg'

import { Container, ContainerDemonstracao, MaxSize } from './styles';
import { schema } from './validation/schema';

import './styles.css';
import 'react-toastify/dist/ReactToastify.css';


interface DataList {
  name: string;
  sum_grade: number;
}

const Ranking = () =>
{    
  const [data, setData] = useState<DataList[]>([]);
  const [classes, setClasses] = useState<IOption[]>([]);
  const location = useLocation();
  const form = useForm({ 
    schema,
    fields: [
      {
        gridSize: {
          md: 12,
        },
        type: "select",
        name: "class_id",
        label: "Classe",
        options: classes,
        onChange: handleSubmit,
      },
    ]
  });

  useEffect(() => {
    api.get(`/classes`).then(({ data }) => {
      setClasses(
        data.map((classe: any) => ({
          label: classe.title,
          value: classe.id,
        }))
      );
    });
  }, []);

  function handleSubmit(e: any) {
    const class_id = e.target.value;
    form.setData({ class_id });

    api.get(`classes/${class_id}/rank`).then(({ data }) => {
      data = data.sort(
        (a: any, b: any) => Number(b.sum_grade) - Number(a.sum_grade)
      ).map((objeto: any, index: any) => {
        return {
          ...objeto,
          id: index
        }
      })

      setData(data)
    });
  }

  return (
    <MainDefault>
      <FormUnform ref={form.ref} onSubmit={handleSubmit} style={{
        width: '100%',
        margin: '30px auto'
      }}>
        <FormBuilder fields={form.fields} />
      </FormUnform>

      <DataTable
        title="Ranking de alunos"
        data={data}
        metadata={[
          {
            prop: 'name',
            label: 'Aluno'
          },
          {
            prop: 'sum_grade',
            label: 'Nota'
          },
        ]}
      />
    </MainDefault>
  )
}

export default Ranking;