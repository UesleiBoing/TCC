import React, { useCallback, useEffect, useState } from "react";

import { Button, ButtonBase } from "@mui/material";
import { Form } from "@unform/web";
import { AiOutlineOrderedList } from "react-icons/ai";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { GiClassicalKnowledge } from "react-icons/gi";
import { HiTemplate } from "react-icons/hi";
import { MdOutlineDescription } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

import DataTable from "components/DataTable";
import FormBuilder from "components/Form/FormBuilder";
import IOption from "components/Form/Select/IOption";
import Title from "components/Typography/Title";

import { useAuth } from "hooks/auth";
import { useForm } from "hooks/form/useForm";
import handleAxiosError from "hooks/handleAxiosError";
import Toast from "hooks/toast/Toast";

import api from "services/api";

import { MainDefault } from "styles/styled-components/MainDefault";

import { ButtonGroup, FormContainer } from "./style";
import { withoutPassword } from "./validation/withoutPassword";
import { withPassword } from "./validation/withPassword";


interface ClasseFormData {
	name: string;
	email: string;
	password: string;
	actual_password: string;
	confirm_password: string;
}

const Profile: React.FC = () => {
	const navigate = useNavigate();
  const { user } = useAuth();

	const form = useForm({
		fields: [
			{
				gridSize: {
					md: 12,
				},
				type: "nome",
				name: "name",
				label: "Nome",
				placeholder: "Nome",
				icon: FiUser,
			},
			{
				gridSize: {
					md: 12,
				},
				type: "email",
				name: "email",
				label: "Email",
				placeholder: "Email",
				icon: FiMail,
			},
			{
				gridSize: {
					md: 12,
				},
				type: "password",
				name: "actual_password",
				label: "Senha atual",
				placeholder: "Senha atual",
				icon: FiLock,
			},
			{
				gridSize: {
					md: 12,
				},
				type: "password",
				name: "password",
				label: "Senha",
				placeholder: "Senha",
				icon: FiLock,
			},
			{
				gridSize: {
					md: 12,
				},
				type: "password",
				name: "confirm_password",
				label: "Confirme a sua senha",
				placeholder: "Confirme a sua senha",
				icon: FiLock,
			},
		],
	});

	const handleResponse = useCallback(async (data: any) => {
		const toast = new Toast().loading();

		try {

      await api.put(
				`/${user.isTeacher ? 'teachers' : 'students'}/${user.id}`, 
        data
      );

			toast.success("Dados enviados com sucesso");
		} catch (error: any) {
			const { message } = handleAxiosError(error);
			toast.error(`Ops... ${message}`);
		}
	}, []);

	const handleSubmit = useCallback(
		async (data: ClasseFormData) => {
			await form.validation(data, {
				schema: data.password ? withPassword : withoutPassword 
			});

			handleResponse(data);
		},
		[handleResponse, form]
	);

	useEffect(() => {
		api.get(`/${user.isTeacher ? 'teachers' : 'students'}/${user.id}`)
      .then(({ data }) => {
        if (!data) {
          return navigate('/dashboard');
        }
        form.setData({
          name: data.name,
          email: data.email,
        })
		});
	}, []);

	return (
		<MainDefault>
			<FormContainer ref={form.ref} onSubmit={handleSubmit}>
				<fieldset className='field-data'>
					<legend className='legend-fielddata'>
						<Title variant='h5'>
							<HiTemplate className='icon-legend' />
							Dados
						</Title>
					</legend>

					<FormBuilder fields={form.fields} />
					<ButtonGroup>
						<Button type='submit' variant='contained'>
              Editar
						</Button>
						<Button
							type='submit'
							component={Link}
							to='/dashboard'
							variant='contained'
							color='error'>
							Voltar
						</Button>
					</ButtonGroup>
				</fieldset>
			</FormContainer>
		</MainDefault>
	);
};

export default Profile;
