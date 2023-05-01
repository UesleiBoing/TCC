import Topic from "./Topic";

export default interface Form {
	id: number;
	title: string;
	description: string;
	topic_id: number;
	order: number;

	topic?: Topic;
}