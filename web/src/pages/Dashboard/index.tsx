import React, { useCallback, useEffect, useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { Form as FormUnform } from '@unform/web';
import { AiOutlineBook, AiOutlineLock, AiOutlineStar } from 'react-icons/ai';
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

import Classe from 'interfaces/entities/Classe';
import Topic from 'interfaces/entities/Topic';

import api from 'services/api';

import Mask from 'utils/Mask';

import { MainDefault } from 'styles/styled-components/MainDefault';

import logo from '../../assets/logo.svg'

import { Container, ContainerDemonstracao, MaxSize, Situation, TitleClass } from './styles';
import { schema } from './validation/schema';

import 'react-toastify/dist/ReactToastify.css';

const SITUATION = {
  OPEN: 'open',
  CLOSED: 'closed',
  LOCKED: 'locked',
}
interface DataList {
  name: string;
  sum_grade: number;
}

const Dashboard = () =>
{
  const [data, setData] = useState<Classe[]>([]);
  
  useEffect(() => {
    api.get(`/classes/forms`).then(({ data }) => {
      setData(data);
    });
  }, []);

  const handleSituation = (topic: Topic) => {
    
  }

  return (
    <MainDefault>
      {
        data.map((classe, index) => {
          const topics = classe.topics || [];
          const topicsFormatted = topics.map((topic, index) => {
            let hasIcon = false;
            let icon = SITUATION.LOCKED;
            
            if (topic?.forms) {
              if (topic.forms?.length > 0) {
                if (topic.forms[0].tests) {
                  if (topic.forms[0].tests.length > 0) {
                    icon = SITUATION.CLOSED;
                  } else {
                    if (index === 0) {
                      icon = SITUATION.OPEN;
                    } else {
                      const lastTopic = topics[index - 1]; 
                      if (lastTopic?.forms) {
                        if (lastTopic.forms?.length > 0) {
                          if (lastTopic.forms[0].tests) {
                            if (lastTopic.forms[0].tests.length > 0) {
                              icon = SITUATION.OPEN;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }



            return {
              ...topic,
              icon: {
                icon,
                id: topic.forms ? topic.forms[0].id : topic.id,
              },
            }
          });
          return (
            <React.Fragment key={classe.id}>
              <TitleClass>{classe.title}</TitleClass>
              <DataTable
                title='teset'
                hasTableHead={false}
                toolbar={false}
                pagination={false}
                denseButton={false}
                data={topicsFormatted}
                metadata={[
                  {
                    prop: 'icon',
                    label: 'Situação',
                    mask: (value: any) => {
                      let iconsvg = <AiOutlineLock color='grey'/>;
                      if (value.icon === SITUATION.OPEN) {
                        iconsvg = <AiOutlineStar/>;
                      } else if (value.icon === SITUATION.CLOSED) {
                        iconsvg = <AiOutlineBook color='green' />;
                      }
                      return <Situation typeicon={value.icon} to={`/tests/${value.id}`}>{iconsvg}</Situation>;
                    }
                  },
                  {
                    prop: 'description',
                    label: 'Descrição'
                  },
                ]}
              />
            </React.Fragment>
          )
        })
      }
      
    </MainDefault>
  )
}

export default Dashboard;