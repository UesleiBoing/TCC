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

import { useAuth } from "hooks/auth";
import { useForm } from "hooks/form/useForm";
import handleAxiosError from "hooks/handleAxiosError";
import Toast from "hooks/toast/Toast";

import FormDTO from "interfaces/entities/Form";
import Keyword from "interfaces/entities/Keyword";
import Student from "interfaces/entities/Student";
import Subject from "interfaces/entities/Subject";
import Teacher from "interfaces/entities/Teacher";
import Topic from "interfaces/entities/Topic";

import api from "services/api";

import { MainDefault } from "styles/styled-components/MainDefault";

import { ButtonGroup, FormContainer } from "./style";
import { schema } from "./validation/schema";


interface FormFormData {
	title: string;
	description: string;
	quantity: number;
	keywords: number[];
}
const enabledQuantity = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const GenerateForms: React.FC = () => {
	const { topic: topic_id } = useParams();
	const { user } = useAuth();

	const [topic, setTopic] = useState<Topic>();
	const [quantity, setQuantity] = useState<IOption[]>([]);
	const [keywords, setKeywords] = useState<IOption[]>([]);

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
				name: "description",
				label: "Description",
				placeholder: "Conteúdo",
				icon: MdOutlineDescription,
			},
			{
				gridSize: {
					md: 12,
				},
				type: "select",
				name: "quantity",
				label: "Quantidade de questões",
				options: quantity,
			},
			{
				gridSize: {
					md: 12,
				},
				type: "select",
				name: "keywords",
				label: "Palavras-chave",
				options: keywords,
				multiple: true,
				check: true,
				chip: true,
				maxOptionsLimit: 3,
			},
		],
		schema,
	});

	const handleResponse = useCallback(async (data: any) => {
		const toast = new Toast().loading();

		try {
			await api.post("/forms/generate", data);
			form.clear();
			
			toast.success("Dados enviados com sucesso");

			navigate(`/${user.isTeacher ? "forms" : "tests"}`)
		} catch (error: any) {
			const { message } = handleAxiosError(error);
			toast.error(`Ops... ${message}`);
		}
	}, []);

	const handleSubmit = useCallback(
		async (dataForm: FormFormData) => {
			
			const data = {
				...dataForm,
				keywords: dataForm.keywords.map((el) => Number(el)),
				quantity: Number(dataForm.quantity),
				topic_id: Number(topic_id),
			};

			await form.validation(data);

			handleResponse(data);
		},
		[handleResponse, form]
	);

	useEffect(() => {
		Promise.all([
			api.get(`/topics/${topic_id}/keywords`).then(({ data }) => {
				setKeywords(
					data.keywords.map((keyword: Keyword) => ({
						value: keyword.id,
						label: keyword.description
					}))
				)
			}),
			api.get(`/topics/${topic_id}`).then(({ data }) => {
				if (!data) {
					return navigate('/topics');
				}
				setTopic(data);
			}),

		]);

		setQuantity(
			enabledQuantity.map((quantity) => ({
				value: quantity.toString(),	
				label: quantity.toString(),
			}))
		);

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
							Gerar
						</Button>
						<Button
							type='submit'
							component={Link}
							to='/forms'
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

export default GenerateForms;
