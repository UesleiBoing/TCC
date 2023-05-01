import React, { useCallback, useEffect, useState } from "react";

import { Button, ButtonBase } from "@mui/material";
import { Form } from "@unform/web";
import { AiOutlineOrderedList } from "react-icons/ai";
import { GiClassicalKnowledge } from "react-icons/gi";
import { HiTemplate } from "react-icons/hi";
import { MdOutlineDescription } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

import DataTable from "components/DataTable";
import FormBuilder from "components/Form/FormBuilder";
import IOption from "components/Form/Select/IOption";
import Title from "components/Typography/Title";

import { useForm } from "hooks/form/useForm";
import handleAxiosError from "hooks/handleAxiosError";
import Toast from "hooks/toast/Toast";

import Classe from "interfaces/entities/Classe";
import Student from "interfaces/entities/Student";
import Subject from "interfaces/entities/Subject";
import Teacher from "interfaces/entities/Teacher";

import api from "services/api";

import { MainDefault } from "styles/styled-components/MainDefault";

import { ButtonGroup, FormContainer } from "./style";
import { schema } from "./validation/schema";


interface ClasseFormData {
	title: string;
	content: string;
	year: string;
	semester: string;
	teacher_id: string;
	subject_id: string;
}
const enabledYears = [ 2023, 2024, 2025, 2026, 2027, 2028 ];
const enabledSemesters = [ 1, 2 ];

const CreateSubjects: React.FC = () => {
	const { id: subject_id } = useParams();

	const navigate = useNavigate();

	const form = useForm({
		fields: [
			{
				gridSize: {
					md: 12,
				},
				type: "text",
				name: "title",
				label: "Título",
				placeholder: "Título",
				icon: MdOutlineDescription,
			},
			{
				gridSize: {
					md: 12,
				},
				type: "text",
				name: "content",
				label: "Conteúdo",
				placeholder: "Conteúdo",
				icon: MdOutlineDescription,
			},
		],
		schema,
	});

	const handleResponse = useCallback(async (data: any) => {
		const toast = new Toast().loading();

		try {
			if (!subject_id) {
				await api.post("/subjects", data);
				form.clear();
			} else {
				await api.put(`/subjects/${subject_id}`, data);
			}

			toast.success("Dados enviados com sucesso");
		} catch (error: any) {
			const { message } = handleAxiosError(error);
			toast.error(`Ops... ${message}`);
		}
	}, []);

	const handleSubmit = useCallback(
		async (data: ClasseFormData) => {
			await form.validation(data);

			handleResponse(data);
		},
		[handleResponse, form]
	);

	useEffect(() => {
		if (!subject_id) {
			return form.clear();
		}

		api.get(`/subjects/${subject_id}`).then(({ data }) => {
			if (!data) {
				return navigate('/subjects');
			}
			form.setData({
				title: data.title,
				content: data.content,
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
							{subject_id ? "Editar" : "Cadastrar"}
						</Button>
						<Button
							type='submit'
							component={Link}
							to='/subjects'
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

export default CreateSubjects;
