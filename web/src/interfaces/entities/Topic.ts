import Classe from "./Classe";

export default interface Topic {
	id: number;
	description: string;
	class_id: number;
	order: number;

	classes?: Classe;
}