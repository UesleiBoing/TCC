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
import Topic from "interfaces/entities/Topic";

import api from "services/api";

import { MainDefault } from "styles/styled-components/MainDefault";

import { ButtonGroup, FormContainer } from "./style";
import { schema } from "./validation/schema";

interface TopicFormData {
	description: string;
	class_id: string;
}

const CreateTopics: React.FC = () => {
	const { id: topic_id } = useParams();

	const [classes, setClasses] = useState<IOption[]>([]);
	const navigate = useNavigate();

	const form = useForm({
		fields: [
			{
				gridSize: {
					md: 12,
				},
				type: "text",
				name: "description",
				label: "Descrição",
				placeholder: "Descrição",
				icon: MdOutlineDescription,
			},
			{
				gridSize: {
					md: 12,
				},
				type: "select",
				name: "class_id",
				label: "Classe",
				options: classes,
			},
			{
				gridSize: {
					md: 12,
				},
				type: "number",
				name: "order",
				label: "Ordem",
				placeholder: "Ordem",
				icon: AiOutlineOrderedList,
			},
		],
		schema,
	});

	const handleResponse = useCallback(async (data: any) => {
		const toast = new Toast().loading();

		data = {
			...data,
			class_id: Number(data.class_id),
			order: Number(data.order),
		};
		
		try {
			if (!topic_id) {
				await api.post("/topics", data);
				form.clear();
			} else {
				await api.put(`/topics/${topic_id}`, data);
			}

			toast.success("Dados enviados com sucesso");

			if (topic_id) {				
				navigate("/topics");
			}
		} catch (error: any) {
			const { message } = handleAxiosError(error);
			toast.error(`Ops... ${message}`);
		}
	}, []);

	const handleSubmit = useCallback(
		async (data: TopicFormData) => {
			await form.validation(data);

			handleResponse(data);
		},
		[handleResponse, form]
	);

	useEffect(() => {
		api
			.get("/classes")
			.then(({ data }) => {
				const classes = data as Classe[];
				setClasses(
					classes.map((classe) => ({
						value: classe.id.toString(),
						label: classe.title,
					}))
				);
			})
			.then(() => {
				if (!topic_id) {
					return form.clear();
				}

				api.get(`/topics/${topic_id}`).then(({ data }) => {
					if (!data) {
						return navigate('/topics');
					}
					const topic = data as Topic;
					form.setData({
						description: topic.description,
						class_id: topic.class_id.toString(),
						order: topic.order.toString(),
					});
				});
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
							{topic_id ? "Editar" : "Cadastrar"}
						</Button>
						<Button
							type='submit'
							component={Link}
							to='/topics'
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

export default CreateTopics;
