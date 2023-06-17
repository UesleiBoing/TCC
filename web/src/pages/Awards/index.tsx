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

import bronze from '../../assets/awards/Bronze.png';
import mestre from '../../assets/awards/Mestre.png';
import ouro from '../../assets/awards/Ouro.png';
import prata from '../../assets/awards/Prata.png';

import { AwardContainer, AwardImg, Container, ContainerDemonstracao, MaxSize, TitleContainer } from './styles';

interface IAward {
  name: string;
  quantity: number;
  img: string;
}

interface DataList {
  name: string;
  sum_grade: number;
}

const Awards = () =>
{    
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(0);
  const awards: IAward[] = [
    {
      name: 'Bronze',
      quantity: 5,
      img: bronze
    },
    {
      name: 'Prata',
      quantity: 10,
      img: prata
    },
    {
      name: 'Ouro',
      quantity: 15,
      img: ouro
    },
    {
      name: 'Mestre',
      quantity: 20,
      img: mestre
    },
  ];

  useEffect(() => {
    const url = user.isTeacher
      ? `/teachers/quantity-forms/${user.id}`
      : `/students/quantity-tests/${user.id}`;

    api.get(url).then(({ data }) => {
      setQuantity(data.quantity);
    }).catch(err => {
      handleAxiosError(err);
    })
  }, []);
  return (
    <MainDefault>
      <TitleContainer>
        <Title variant='h3'>Medalhas</Title>

        <span className="helper">
          {user.isTeacher ? 'Formulários ' : ' Testes '}
          {user.isTeacher ? ' cadastrados' : ' realizados'}: {quantity}
        </span>
      </TitleContainer>

      {awards.map((award, index) => (
        <AwardContainer key={index}>
          <Title variant='h5'>Nível {award.name}</Title>
          <AwardImg src={award.img} alt="" conquisted={quantity >= award.quantity}/>
          <br />
          <small>
            Conquistado após 
            <br />
            {award.quantity}
            {user.isTeacher ? ' formulários ' : ' testes '}
            {user.isTeacher ? ' cadastrados ' : ' realizados '}
          </small>
        </AwardContainer>
      ))}
    </MainDefault>
  )
}

export default Awards;