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

import FormBuilder from 'components/Form/FormBuilder';
import IGridField        from 'components/Form/FormBuilder/interfaces/IGridField';
import Title from 'components/Typography/Title';

import { useAuth }      from 'hooks/auth';
import { useForm } from 'hooks/form/useForm';
import handleAxiosError from 'hooks/handleAxiosError';
import Toast          from 'hooks/toast/Toast';

import Mask from 'utils/Mask';

import logo from '../../assets/logo.svg'

import { Container, ContainerDemonstracao, MaxSize } from './styles';
import { schema } from './validation/schema';

import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () =>
{
    const form = useForm({ schema });
    
    const location = useLocation();


    const fieldsInput: IGridField[] = [
        {            
            type: "text", 
            name: "name", 
            icon: MdOutlineDescription, 
            label: "Com ícone",
            placeholder: 'Com ícone' 
        },
        {            
            type: "text", 
            name: "name", 
            label: "Sem ícone",
            placeholder: 'Sem ícone' 
        },
        {            
            type: "text", 
            name: "name", 
            label: "Filled",
            placeholder: 'Filled',
            variant: 'filled', 
        },
        {            
            type: "text", 
            name: "name", 
            label: "Outlined",
            placeholder: 'Outlined',
            variant: 'outlined', 
        },
        {            
            type: "text", 
            name: "name", 
            label: "Standard",
            placeholder: 'standard',
            variant: 'standard', 
        },
    ]

    const fieldsSelect: IGridField[] = [
        {            
            type: "select", 
            name: "email", 
            label: "Outlined",
            variant: "outlined",
            options: [
                { label: 'Teste 1', value: 'Teste 1'},
                { label: 'Teste 2', value: 'Teste 2'},
                { label: 'Teste 3', value: 'Teste 3'},
            ] 
        },
        {            
            type: "select", 
            name: "email", 
            label: "Filled",
            variant: "filled",
            options: [
                { label: 'Teste 1', value: 'Teste 1'},
                { label: 'Teste 2', value: 'Teste 2'},
                { label: 'Teste 3', value: 'Teste 3'},
            ] 
        },
        {            
            type: "select", 
            name: "email", 
            label: "Standard",
            variant: "standard",
            options: [
                { label: 'Teste 1', value: 'Teste 1'},
                { label: 'Teste 2', value: 'Teste 2'},
                { label: 'Teste 3', value: 'Teste 3'},
            ] 
        },
    ]

    const fieldsSelectMultiples: IGridField[] = [
        {            
            type: "select", 
            name: "email", 
            label: "Multiple",
            multiple: true,            
            options: [
                { label: 'Teste 1', value: 'Teste 1'},
                { label: 'Teste 2', value: 'Teste 2'},
                { label: 'Teste 3', value: 'Teste 3'},
            ] 
        },
        {            
            type: "select", 
            name: "email", 
            label: "Check",
            multiple: true,  
            check: true,           
            options: [
                { label: 'Teste 1', value: 'Teste 1'},
                { label: 'Teste 2', value: 'Teste 2'},
                { label: 'Teste 3', value: 'Teste 3'},
            ] 
        },
        {            
            type: "select", 
            name: "email", 
            label: "Chip",
            multiple: true,  
            check: true,
            chip: true,           
            options: [
                { label: 'Teste 1', value: 'Teste 1'},
                { label: 'Teste 2', value: 'Teste 2'},
                { label: 'Teste 3', value: 'Teste 3'},
            ] 
        },
    ];

    return (
      <Container>

        <MaxSize>

            <FormUnform ref={form.ref} onSubmit={() => {}}>

                <ContainerDemonstracao>
                    <Title variant='h4' style={{ marginBottom: '20px' }}> INPUT </Title>
                    <FormBuilder fields={fieldsInput}/>
                </ContainerDemonstracao>

                <ContainerDemonstracao>
                    <Title variant='h4' style={{ marginBottom: '20px' }}> SELECT </Title>
                    <FormBuilder fields={fieldsSelect}/>
                </ContainerDemonstracao>

                <ContainerDemonstracao>
                    <Title variant='h4' style={{ marginBottom: '20px' }}> SELECT MULTIPLES </Title>
                    <FormBuilder fields={fieldsSelectMultiples}/>
                </ContainerDemonstracao>

            </FormUnform>
        </MaxSize>
      </Container>
    )
}

export default Dashboard;