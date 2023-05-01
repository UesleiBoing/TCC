import Keyword from "./Keyword";
import Question from "./Question";

export default interface KeywordQuestion {
	id: number;
	keyword_id: number;
	question_id: number;

	keyword?: Keyword;
	question?: Question;
}