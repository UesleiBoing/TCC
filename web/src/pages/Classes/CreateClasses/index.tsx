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
import ClassStudent from "interfaces/entities/ClasseStudent";
import Student from "interfaces/entities/Student";
import Subject from "interfaces/entities/Subject";
import Teacher from "interfaces/entities/Teacher";

import api from "services/api";

import { ButtonGroupEnd } from "styles/styled-components/ButtonGroupEnd";
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

const CreateClasses: React.FC = () => {
	const { id: class_id } = useParams();

	const [years, setYears] = useState<IOption[]>([]);
	const [students, setStudents] = useState<IOption[]>([]);
	const [subjects, setSubjects] = useState<IOption[]>([]);
	const [teachers, setTeachers] = useState<IOption[]>([]);
	const [semesters, setSemesters] = useState<IOption[]>([]);

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
			{
				gridSize: {
					md: 6,
				},
				type: "select",
				name: "year",
				label: "Ano",
				options: years,
			},
			{
				gridSize: {
					md: 6,
				},
				type: "select",
				name: "semester",
				label: "Semestre",
				options: semesters,
			},
			{
				gridSize: {
					md: 12,
				},
				type: "select",
				name: "subject_id",
				label: "Matéria",
				options: subjects,
			},
			{
				gridSize: {
					md: 12,
				},
				type: "select",
				name: "teacher_id",
				label: "Professor",
				options: teachers,
			},
			{
				gridSize: {
					md: 12,
				},
				type: "select",
				name: "students",
				label: "Estudantes",
				options: students,
				multiple: true,
				check: true,
				chip: true,
			},
		],
		schema,
	});

	const handleResponse = useCallback(async (data: any) => {
		const toast = new Toast().loading();

		data = {
			...data,
			year: Number(data.year),
			semester: Number(data.semester),
			teacher_id: Number(data.teacher_id),
			subject_id: Number(data.subject_id),
			students: data.students.map((student: string) => Number(student))
		};

		try {
			if (!class_id) {
				await api.post("/classes", data);
				form.clear();
			} else {
				await api.put(`/classes/${class_id}`, data);
			}

			toast.success("Dados enviados com sucesso");

			if (class_id) {
				navigate("/classes");
			}
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
		Promise.all([
			api.get('/teachers').then(({ data }) => {
				setTeachers(
					data.map((teacher: Teacher) => ({
						value: teacher.id,
						label: teacher.name
					}))
				)
			}),
			api.get('/subjects').then(({ data }) => {
				setSubjects(
					data.map((subject: Subject) => ({
						value: subject.id,
						label: subject.title
					}))
				)
			}),
			api.get('/students').then(({ data }) => {
				setStudents(
					data.map((student: Student) => ({
						value: student.id,
						label: student.name
					}))
				)
			}),

		]).then(() => {

			if (!class_id) {
				return form.clear();
			}

			api.get(`/classes/${class_id}`).then(({ data }) => {
				if (!data) {
					return navigate('/classes');
				}
				form.setData({
					title: data.title,
					content: data.content,
					year: data.year,
					semester: data.semester,
					teacher_id: data.teacher_id,
					subject_id: data.subject_id,
					students: data.classes_students.map((el: ClassStudent) => el.student_id),
				})
			});
		});

		setYears(
			enabledYears.map(year => ({
				value: year.toString(),
				label: year.toString(),
			}))
		);

		setSemesters(
			enabledSemesters.map(semester => ({
				value: semester.toString(),
				label: semester.toString(),
			}))
		)

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
					<ButtonGroupEnd>
						<Button type='submit' variant='contained'>
							{class_id ? "Editar" : "Cadastrar"}
						</Button>
						<Button
							type='submit'
							component={Link}
							to='/classes'
							variant='contained'
							color='error'>
							Voltar
						</Button>
					</ButtonGroupEnd>
				</fieldset>
			</FormContainer>
		</MainDefault>
	);
};

export default CreateClasses;
