import Form from "./Form";

export default interface Question {
	id: number;
	description: string;
	weight: number;
	type: 1 | 2 | 3 | 4;

	correct_answer?: string;
	order: number;
}