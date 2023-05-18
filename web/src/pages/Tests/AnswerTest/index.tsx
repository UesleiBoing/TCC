import React, { useCallback, useEffect, useState } from "react";

import { Button, ButtonBase, Checkbox } from "@mui/material";
import { Form as FormWeb } from "@unform/web";
import { HiTemplate } from "react-icons/hi";
import { MdOutlineDescription } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

import Title from "components/Typography/Title";

import { useForm } from "hooks/form/useForm";
import handleAxiosError from "hooks/handleAxiosError";
import Toast from "hooks/toast/Toast";

import Form from "interfaces/entities/Form";
import FormQuestion from "interfaces/entities/FormQuestion";
import Question from "interfaces/entities/Question";

import api from "services/api";

import { MainDefault } from "styles/styled-components/MainDefault";

import { AnswerCheck, AnswerContainer, AnswerDescription, AnswerOption, BigCircle, BtnHolder, ButtonGroup, DescriptionHolder, FinalGradeButtonGroup, FormContainer, QuestionContainer, ShowFinalGrade, SmallCircle, TestSection, WarningAnswer } from "./style";
import { schema } from "./validation/schema";



interface QuestionAnswerSelected {
	[key:string]: number|undefined;
}

interface GradeOfTest {
	grade: number;
	possibleGrade: number;
}

const AnswerTest: React.FC = () => {
	const { id: form_id } = useParams();
	const [form, setForm] = useState<Form>();
	const [questions, setQuestions] = useState<Question[]>([]);
	const [questionToShow, setQuestionToShow] = useState<number>(0);
	const [answersSelected, setAnswerSelected] = useState<QuestionAnswerSelected>({});
	const [showAnswer, setShowAnswer] = useState<boolean>(false);
	const [grade, setGrade] = useState<GradeOfTest>();

	const navigate = useNavigate();

	const formHook = useForm({
		schema
	});

	useEffect(() => {
		if (!form_id) {
			return;
		}

		api.get(`/forms/${form_id}?questions=true&answers=true`).then(({ data }) => {
			if (!data) {
				return navigate('/subjects');
			}
			
			setForm(data);
			setQuestions(data.formQuestions.map((formQuestion: FormQuestion) => formQuestion.question));
		});
	}, []);

	const checkIfAnswerIsSelected = (question_id: number, answer_id: number) => {
		const answer = answersSelected[`question-${question_id.toString()}`];

		return Number(answer) === Number(answer_id);
	}

	const setCorrectAnswer = (question_id: number, answer_id: number) => {
		const answerOffered = answersSelected[`question-${question_id.toString()}`] === answer_id 
			? undefined 
			: answer_id;

		setAnswerSelected((prevState) => ({
			...prevState,
			[`question-${question_id.toString()}`]: answerOffered
		}));
	}

	const handleSubmit = useCallback(
		async () => {
			if (!checkIfItsAnswered()) {
				return;
			}

			const answersHandled = Object.keys(answersSelected).map(key => {
				const question_id = Number(key.replace('question-', ''));

				return {
					description: answersSelected[key],
					question_id,
				};
			});

			const data = {
				form_id: Number(form_id),
				answers: answersHandled
			}

			await formHook.validation(data);
			
			const toast = new Toast().loading();

			try {
				const response = await api.post("/tests", data);
				toast.dismiss();

				setGrade({
					grade: response.data.grade,
					possibleGrade: response.data.possibleOfCorrectGrade
				})
				
			} catch (error: any) {
				const { message } = handleAxiosError(error);
				toast.error(`Ops... ${message}`);
			}
		},
		[formHook]
	);

	const checkIfItsAnswered = () => {
		const actualQuestion = questions[questionToShow];
		const value = answersSelected[`question-${actualQuestion.id.toString()}`];

		
		if (!value) {
			new Toast().error('Alguma resposta deve ser informada!');
			return false;
		}

		return true;
	}

	const goToNextQuestion = (e?: React.MouseEvent<HTMLButtonElement>) => {

		setShowAnswer(false);
		
		if (questionToShow !== questions.length - 1) {
			setQuestionToShow((prevState) => prevState + 1);
			if (e) {
				e.preventDefault();
			}
		}
		
	}

	const handleAvancar = () => {
		if (checkIfItsAnswered()) {
			setShowAnswer(true);
		}
	}

	const isCorrectAnswer = () => {
		const actualQuestion = questions[questionToShow];
		const value = answersSelected[`question-${actualQuestion.id.toString()}`];

		return Number(actualQuestion.correct_answer) === Number(value);
	}

	const showCorrectAnswer = () => {
		const actualQuestion = questions[questionToShow];

		return actualQuestion.answers
			?.find(answer => Number(answer.value) === Number(actualQuestion.correct_answer))
			?.description;
	}

	if (grade) {
		const actualGrade = grade.grade;
		const possibleGrade = grade.possibleGrade;

		return (
			<ShowFinalGrade>
				<section id="main-grade-content">
					<Title variant="h3">
						{
							(actualGrade / possibleGrade) > 0.7
								? 'Parabéns, você foi muito bem!'
								: 'Você pode melhorar!'
						}
					</Title>
					<BigCircle>
						<SmallCircle>
							<span className="actual-grade">
								{actualGrade.toFixed(2)}
							</span>
							<span className="possible-grade">
								/{possibleGrade}
							</span>
						</SmallCircle>
					</BigCircle>
				</section>
				
				<FinalGradeButtonGroup>
					<Button type='submit' 
						fullWidth
						onClick={() => {
							if (form?.standard) {
								navigate('/dashboard')
							} else {
								navigate('/tests')
							}
						}}
						variant='contained'>
						
						Finalizar
					</Button>
				</FinalGradeButtonGroup>
				
			</ShowFinalGrade>
		)
	}
	
	return (
		<MainDefault style={{
			display: 'flex',
			justifyContent: 'space-between',
		}}>
			<FormWeb ref={formHook.ref} onSubmit={handleSubmit} style={{
				pointerEvents: showAnswer ? 'none' : 'all'
			}}>
				<fieldset className='field-data'>
					<legend className='legend-fielddata'>
						<Title variant='h5'>
							<HiTemplate className='icon-legend' />
							{form?.title}
						</Title>
					</legend>

					<TestSection>
					{questions.map((question: Question, index) => (
						<React.Fragment key={question.id}>
						{ index === questionToShow &&
							<QuestionContainer key={question.id}>
								<div className="title">
									{`${index + 1}. ${question.description}`}
								</div>
								<AnswerContainer>
									{question.answers?.map((answer, index) => (
										<AnswerOption key={answer.id}>
											<AnswerCheck>
												<Checkbox 
													checked={answersSelected[`question-${question.id}`] === answer.value} 
													onClick={() => setCorrectAnswer(question.id, answer.value)}
													name={`answer-check-${index}`} 
													value={answer.value} 
												/>
											</AnswerCheck>
											<AnswerDescription>
												{answer.description}
											</AnswerDescription>
										</AnswerOption>
									))}
								</AnswerContainer>

							</QuestionContainer>
						}
						</React.Fragment>

					))
					}

					</TestSection>

				</fieldset>
			</FormWeb>


			{!showAnswer &&
			<div style={{
					width: '96vw',
					padding: '0.75rem 1.25rem',
					margin: '10px 0 1rem 0',
				}}
			>
				<Button type='button' variant='contained' 
					
					onClick={handleAvancar}
					fullWidth>
					Avançar
				</Button>
				</div>
			}

			{showAnswer &&
				<WarningAnswer success={isCorrectAnswer()}>
					<DescriptionHolder>
						<p>
							{isCorrectAnswer()
								? 'Parabéns, a resposta está correta!' 
								: 'Ops, a resposta está incorreta!'
							}
						</p>
						{showCorrectAnswer()}
					</DescriptionHolder>

					<BtnHolder>
						{
							questionToShow !== questions.length - 1 ? (
								<Button type='button' variant='contained' 
									onClick={goToNextQuestion}
									fullWidth>
									Avançar
								</Button>
							) : (
								<Button type='submit' 
									onClick={handleSubmit}
									fullWidth
									variant='contained'>
									
									Enviar
								</Button>
							)
						}
					</BtnHolder>
				</WarningAnswer>
			}
		</MainDefault>
	);
};

export default AnswerTest;
