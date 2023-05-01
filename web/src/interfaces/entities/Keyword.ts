import Topic from "./Topic";

export default interface Keyword {
	id: number;
	description: string;
	topic_id: number;

	topic?: Topic;
}