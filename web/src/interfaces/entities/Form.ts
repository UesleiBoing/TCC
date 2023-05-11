import FormQuestion from "./FormQuestion";
import Test from "./Test";
import Topic from "./Topic";

export default interface Form {
	id: number;
	title: string;
	description: string;
	topic_id: number;
	order: number;

	standard: boolean;
	active: boolean;

	topic?: Topic;
	formQuestions: FormQuestion[];

	tests?: Test[];
}