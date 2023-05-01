import Question from "./Question";
import Test from "./Test";

export default interface StudentAnswer {
	id: number;
	description: string;

	question_id: number;
	question?: Question;
	
	test_id: number;
	test?: Test;

}