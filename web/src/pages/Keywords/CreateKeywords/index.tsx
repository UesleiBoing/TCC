import React, { useCallback, useEffect, useState } from 'react';

import { Button, ButtonBase } from '@mui/material';
import { Form } from '@unform/web';
import { HiTemplate } from 'react-icons/hi';
import { MdOutlineDescription } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';

import DataTable from 'components/DataTable';
import FormBuilder from 'components/Form/FormBuilder';
import IOption from 'components/Form/Select/IOption';
import Title from 'components/Typography/Title';

import { useForm } from 'hooks/form/useForm';
import handleAxiosError from 'hooks/handleAxiosError';
import Toast from 'hooks/toast/Toast';

import Classe from 'interfaces/entities/Classe';
import Keyword from 'interfaces/entities/Keyword';
import Topic from 'interfaces/entities/Topic';

import api from 'services/api';

import { MainDefault } from 'styles/styled-components/MainDefault';

import { ButtonGroup, FormContainer, TitleSection } from './style';
import { schema } from './validation/schema';

interface KeywordFormData {
  description: string;
}

const CreateKeywords: React.FC = () => {
  const { topic: topic_id, id: keyword_id } = useParams();
  const [topic, setTopic] = useState<Topic>();

  const navigate = useNavigate();
  
  const form = useForm({
    fields: [
        {   
            gridSize: {
                md: 12,
            },
            type: 'text',
            name: 'description',
            label: 'Descrição',
            placeholder: 'Descrição',
            icon: MdOutlineDescription
        }, 
    ],
    schema,
  });

  const handleResponse = useCallback(
    async (data: any) => {
      const toast = new Toast().loading();
      
      data = {
        ...data,
        topic_id: Number(topic_id)
      }

      try {
          if (!keyword_id) {
            await api.post('/keywords', data); 
            form.clear();
          } else {
            await api.put(`/keywords/${keyword_id}`, data)
          }

          toast.success('Dados enviados com sucesso');

          if (keyword_id) {
            navigate(`/topics/${topic_id}/keywords`);
          }
      } catch (error: any) {
          const { message } = handleAxiosError(error);
          toast.error(`Ops... ${message}`);      
      }
    }, []
  )

  const handleSubmit = useCallback(
    async (data: KeywordFormData) => {
        await form.validation(data);

        handleResponse(data);
    }, [handleResponse, form],
);

  useEffect(() => {
    api.get(`/topics/${topic_id}`).then(({ data }) => {
      if (!data) {
        return navigate('/topics');
      }
      setTopic(data);
    });

    if (!keyword_id) {
      return form.clear();
    }

    api.get(`/keywords/${keyword_id}`).then(({ data }) => {
      if (!data || data.topic_id !== Number(topic_id)) {
        return navigate(`/topics/${topic_id}/keywords`);
      }
      const keyword = data as Keyword;
      form.setData({ description: keyword.description });
    });
  }, []);
  
  return (
    <MainDefault>
      <TitleSection>
        <Title variant='h4'> {topic?.description}</Title>
      </TitleSection>

      <FormContainer ref={form.ref} onSubmit={handleSubmit} >
        <fieldset className='field-data'>
          <legend className='legend-fielddata'>
              <Title variant='h5'>
                  <HiTemplate className='icon-legend'/>
                  Dados
              </Title>
            </legend>

            <FormBuilder fields={form.fields}/>                    
          <ButtonGroup>
            <Button type="submit" variant='contained'>
              { keyword_id ? 'Editar' : 'Cadastrar' }
            </Button>
            <Button type="submit"
              component={Link}
              to={`/topics/${topic_id}/keywords`}
              variant='contained' 
              color="error"
            >
              Voltar
            </Button>
          </ButtonGroup>
        </fieldset>   
      </FormContainer>

    </MainDefault>
  );
};

export default CreateKeywords;
