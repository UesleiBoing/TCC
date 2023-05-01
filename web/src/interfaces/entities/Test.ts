import Form from "./Form";
import Student from "./Student";

export default interface Test {
	id: number;
	grade: number;
	content: string;

	student_id: number;
	student?: Student;

	form_id: number;
	form?: Form;
}