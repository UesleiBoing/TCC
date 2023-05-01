import Form from "./Form";
import Question from "./Question";

export default interface FormQuestion {
	id: number;
	form_id: number;
	question_id: number;

	form?: Form;
	question?: Question;
}