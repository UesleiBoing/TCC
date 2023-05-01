import Question from "./Question";

export default interface Answer {
	id: number;
	description: string;
	question_id: number;
	order: number;
	value: number;

	question?: Question;
}