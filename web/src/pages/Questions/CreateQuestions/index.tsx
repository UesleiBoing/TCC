import React, { useCallback, useEffect, useState } from "react";

import { Button, ButtonBase, Checkbox, TextField as InputMUI } from "@mui/material";
import { Form } from "@unform/web";
import { AiOutlineOrderedList } from "react-icons/ai";
import { FaTrashAlt, FaWeightHanging } from "react-icons/fa";
import { GiClassicalKnowledge } from "react-icons/gi";
import { HiTemplate } from "react-icons/hi";
import { MdOutlineDescription } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

import DataTable from "components/DataTable";
import FormBuilder from "components/Form/FormBuilder";
import Input from "components/Form/Input";
import IOption from "components/Form/Select/IOption";
import Title from "components/Typography/Title";

import { useForm } from "hooks/form/useForm";
import handleAxiosError from "hooks/handleAxiosError";
import Toast from "hooks/toast/Toast";

import Answer from "interfaces/entities/Answer";
import ClassStudent from "interfaces/entities/ClasseStudent";
import Keyword from "interfaces/entities/Keyword";
import KeywordQuestion from "interfaces/entities/KeywordQuestion";
import Question from "interfaces/entities/Question";
import Student from "interfaces/entities/Student";
import Subject from "interfaces/entities/Subject";
import Teacher from "interfaces/entities/Teacher";
import Topic from "interfaces/entities/Topic";

import api from "services/api";

import { MainDefault } from "styles/styled-components/MainDefault";

import { AnswerCheck, AnswerDescription, AnswerOption, AnswersSection, ButtonGroup, ButtonRemoveAnswer, FormContainer, TitleSection } from "./style";
import { schema } from "./validation/schema";


interface QuestionFormData {
	description: string;
	weight: string;
	keywords: string[];
	questions: string[];
	[key: string]: string|string[];
}

interface AnswersFormData {
	id?: number;
	description: string;
	value: string;
	visible: boolean;
}

const initializedAnswers: AnswersFormData[] = [
	{
		description: "",
		value: "1",
		visible: true,
	},
	{
		description: "",
		value: "2",
		visible: true,
	},
	{
		description: "",
		value: "3",
		visible: true,
	},
	{
		description: "",
		value: "4",
		visible: true,
	},
	{
		description: "",
		value: "5",
		visible: true,
	},
];

const CreateQuestions: React.FC = () => {
	const { topic: topic_id, id: question_id } = useParams();

	const [keywords, setKeywords] = useState<IOption[]>([]);
	const [topic, setTopic] = useState<Topic>();
	const [answers, setAnswers] = useState<AnswersFormData[]>(initializedAnswers);
	const [correctAnswer, setCorrectAnswer] = useState<string>();

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
				placeholder: "Conteúdo",
				icon: MdOutlineDescription,
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
			{
				gridSize: {
					md: 12,
				},
				type: "number",
				name: "weight",
				label: "Peso",
				placeholder: "Peso",
				icon: FaWeightHanging,
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

		try {
			if (!question_id) {
				await api.post("/questions", data);
				form.clear();
				setCorrectAnswer(undefined);
				setAnswers(initializedAnswers)
			} else {
				await api.put(`/questions/${question_id}`, data);
			}

			toast.success("Dados enviados com sucesso");
		} catch (error: any) {
			const { message } = handleAxiosError(error);
			toast.error(`Ops... ${message}`);
		}
	}, []);

	const extractAnswers = (answers: AnswersFormData[]) => {
		const answeres =  answers.filter((el) => el.visible && el.description !== '');

		const answeresFormattedArray = answeres.map(
			({ id, description, value}, index) => ({ 
				id, 
				description, 
				value: Number(value), 
				order: index,
			}
		));

		return answeresFormattedArray;
	}

	const validateCorrectAwnser = (
		correctAnswer: string | undefined, 
		answers: any[]
	) => {
		if (!correctAnswer) {
			new Toast().error('A resposta correta não foi selecionada!');
			throw new Error('correct answer not found');
		}
		
		const answer = answers.find((el) => Number(el.value) === Number(correctAnswer));

		if (!answer) {
			new Toast().error('A resposta correta não possui valor!');
			throw new Error('correct answer not found');
		}
	}

	const handleSubmit = useCallback(
		async (dataForm: QuestionFormData) => {

			const data = {
				description: dataForm.description,
				weight: Number(dataForm.weight),
				topic_id: Number(topic_id),
				order: Number(dataForm.order),
				correct_answer: correctAnswer,
				answers: extractAnswers(answers),
				type: 1,
				keywords: dataForm.keywords.map((el) => Number(el)),
			}

			validateCorrectAwnser(correctAnswer, data.answers);
			await form.validation(data);

			handleResponse(data);
		},
		[handleResponse, form]
	);

	const handleRemoveLine = (value: string) => {
		setAnswers(answers.map((el) => {
			if (el.value === value) {
				el.visible = false;
			}

			return el;
		}));
	} 

	const handleAddLine = () => {
		const answersVisibled = answers.filter((el) => el.visible);
		const answersValues = answersVisibled.map((el) => Number(el.value));
		const newValue = Math.max(...answersValues) + 1;

		setAnswers([
			...answers,
			{
				description: ``,
				value: newValue.toString(),
				visible: true,
			}
		]);
	} 

	const handleInputAnswerChange = (
		e: React.ChangeEvent<HTMLInputElement>, 
		valueOfAnswer: string
	) => {
		setAnswers(answers.map((el) => {
			if (el.value === valueOfAnswer) {
				el.description = e.target.value;
			}

			return el;
		}));
	}
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
		]).then(() => {

			if (!question_id) {
				form.setData({
					weight: '1.00',
				});
				return;
			}

			api.get(`/questions/${question_id}`).then(({ data }) => {
				if (!data || data.keywordQuestions[0].keyword.topic_id !== Number(topic_id)) {
					return navigate(`/topics/${topic_id}/questions`);
				}
				const keywordsOfAnswer = data.keywordQuestions.map((el: KeywordQuestion) => el.keyword?.id);
				const answersInOrder = data.answers.sort((a: Answer, b: Answer) => a.order - b.order);
				
				setAnswers(
					answersInOrder.map(({ id, description, value }: Answer) => ({
						id,
						description,
						value: value.toString(),
						visible: true,
					}))
				);

				form.setData({
					description: data.description,
					content: data.content,
					weight: data.weight,
					order: data.order,
					keywords: keywordsOfAnswer,
				});

				setCorrectAnswer(data.correct_answer);
			});
		});
	}, []);

	return (
		<MainDefault>
			<TitleSection	>
        <Title variant='h4'> {topic?.description}</Title>
      </TitleSection>

			<FormContainer ref={form.ref} onSubmit={handleSubmit}>
				<fieldset className='field-data'>
					
					<legend className='legend-fielddata'>
						<Title variant='h5'>
							<HiTemplate className='icon-legend' />
							Dados
						</Title>
					</legend>

					<FormBuilder fields={form.fields} />
					<br />
					<br />
					
					<AnswersSection>
						<ButtonGroup>
							<Button type='button'
								color='success'
								onClick={handleAddLine} 
								disabled={answers.filter(el => el.visible).length >= 10}
								variant='contained'>
								Nova Resposta
							</Button>
						</ButtonGroup>
						{
							answers.map((answer, index) => (
								<AnswerOption key={index} visible={!!answer.visible}>
									<AnswerCheck>
										<Checkbox checked={answer.value === correctAnswer} 
											onChange={() => setCorrectAnswer(answer.value)}
											name={`answer-check-${index}`} 
											value={answer.value} />
									</AnswerCheck>
									<InputMUI name={`answer-value-${answer.value}`} 
										value={answer.description}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputAnswerChange(e, answer.value)}
										variant="outlined"
										fullWidth/>
									<ButtonRemoveAnswer type='button'
										variant='contained'
										disabled={answers.filter(el => el.visible).length <= 1}
										onClick={() => handleRemoveLine(answer.value)}

									>
										<FaTrashAlt size={20}/>
									</ButtonRemoveAnswer>
								</AnswerOption>
							))
						}
					</AnswersSection>
					<ButtonGroup>
						<Button type='submit' variant='contained'>
							{question_id ? "Editar" : "Cadastrar"}
						</Button>
					
						<Button
							type='submit'
							component={Link}
							to='/questions'
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

export default CreateQuestions;
