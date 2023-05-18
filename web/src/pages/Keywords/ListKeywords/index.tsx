import React, { useEffect, useState } from 'react';

import { Button, ButtonBase } from '@mui/material';
import { Form } from '@unform/web';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdImportantDevices } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';

import DataTable from 'components/DataTable';
import Input from 'components/Form/Input';
import Title from 'components/Typography/Title';

import { useAuth } from 'hooks/auth';
import { useForm } from 'hooks/form/useForm';
import Toast from 'hooks/toast/Toast';

import Keyword from 'interfaces/entities/Keyword';
import Topic from 'interfaces/entities/Topic';

import api from 'services/api';

import { ButtonGroupEnd } from 'styles/styled-components/ButtonGroupEnd';
import { MainDefault } from 'styles/styled-components/MainDefault';

import { ButtonGroup, MostUsedBlock, TitleSection } from './style';

const ListKeywords: React.FC = () => {

  const { topic: topic_id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [mostUsedKeywords, setMostUsedKeywords] = useState<Keyword[]>([]);
  const [topic, setTopic] = useState<Topic>();
  
  const handleDeleteKeyword = (e: React.MouseEvent, id:number) => {
    e.stopPropagation();

    api.delete(`/keywords/${id}`)
      .then(({ data }) => {
        setKeywords(keywords.filter(keyword => keyword.id !== id));
        new Toast().success('Palavra-chave deletada com sucesso!')
      })
      .catch((err) => new Toast().error('Impossível deletar a palavra-chave!'));
  }

  useEffect(() => {
    api.get(`/topics/${topic_id}/keywords`).then(({ data }) => {
      if (!data) {
        return navigate('/topics');
      }
      setKeywords(data.keywords);
      setTopic(data);
    });
    api.get(`/topics/${topic_id}/keywords/most`).then(({ data }) => {
      setMostUsedKeywords(data);
    });
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
            to={`/topics/${topic_id}/keywords/create`} 
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
        title="Palavras-chave"
        data={keywords}
        metadata={[ 
          {
            prop: 'description',
            label: 'Descrição',
          },
          {
            prop: 'id',
            label: 'Mais Usado?',
            mask: (value: string) => {
              const mostUsed = mostUsedKeywords
                .find(keyword => Number(keyword.id) === Number(value));

              if (mostUsed) {
                return (
                  <MostUsedBlock>
                    <MdImportantDevices />
                  </MostUsedBlock>
                )
              }

              return '';
            },
          }

        ]}
        actions={({ id }) => (
          <>
            <Button component={Link}
              to={`/topics/${topic_id}/keywords/${id}`}
              variant="contained"
              color='secondary'>
              <FiEdit />
            </Button>

            <Button onClick={(e) => handleDeleteKeyword(e, id)}
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

export default ListKeywords;
