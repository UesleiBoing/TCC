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

import FormDTO from "interfaces/entities/Form";
import Keyword from "interfaces/entities/Keyword";
import Question from "interfaces/entities/Question";
import Student from "interfaces/entities/Student";
import Subject from "interfaces/entities/Subject";
import Teacher from "interfaces/entities/Teacher";
import Topic from "interfaces/entities/Topic";

import api from "services/api";

import { MainDefault } from "styles/styled-components/MainDefault";

import { ButtonGroup, FormContainer, QuestionCard, QuestionTitle, QuestionsSection } from "./style";
import { schema } from "./validation/schema";


interface FormFormData {
	title: string;
	description: string;
}

const StandardForms: React.FC = () => {
	const { topic: topic_id } = useParams();
	
	const [topic, setTopic] = useState<Topic>();
	const [questions, setQuestions] = useState<Question[]>([]);
	const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

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
		],
		schema,
	});

	const handleResponse = useCallback(async (data: any) => {
		const toast = new Toast().loading();

		try {
			await api.post("/forms/generate", data);
			form.clear();

			toast.success("Dados enviados com sucesso");
		} catch (error: any) {
			const { message } = handleAxiosError(error);
			toast.error(`Ops... ${message}`);
		}
	}, []);

	const handleSubmit = useCallback(
		async (dataForm: FormFormData) => {
			
			const data = {
				...dataForm,
				topic_id: Number(topic_id),
				questions: selectedQuestions,
			};

			await form.validation(data);

			handleResponse(data);
		},
		[handleResponse, form]
	);
	
	const handleClickQuestion = (question_id: number) => {
		if (selectedQuestions.includes(question_id)) {
			setSelectedQuestions(
				selectedQuestions.filter((question) => question !== question_id)
			);
			return;
		}

		setSelectedQuestions([...selectedQuestions, question_id]);
	}

	useEffect(() => {
		Promise.all([
			api.get(`/topics/${topic_id}/questions`).then(({ data }) => {
        setQuestions(data);
      }),
			api.get(`/topics/${topic_id}`).then(({ data }) => {
				if (!data) {
					return navigate('/topics');
				}
				setTopic(data);
			}),
		]);
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

					<QuestionsSection>
						{
							questions.map(question => (
								<QuestionCard
									isSelected={selectedQuestions.includes(question.id)}
									onClick={() => handleClickQuestion(question.id)}
								>
									{question.description}
								</QuestionCard>
							))
						}
					</QuestionsSection>
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

export default StandardForms;
