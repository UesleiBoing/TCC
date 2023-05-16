import Subject from "./Subject";
import Teacher from "./Teacher";
import Topic from "./Topic";

export default interface Classe {
	id: number;
	title: string;
	content: string;
	year: string;
	semester: string;
	teacher_id: number;
	subject_id: number;

  teacher?: Teacher;
  subject?: Subject;

	topics?: Topic[];
}