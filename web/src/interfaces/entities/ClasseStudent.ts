import Classe from "./Classe";
import Student from "./Student";

export default interface ClassStudent {
	id: number;
	class_id: number;
	student_id: number;

	class?: Classe;
	student?: Student;
}