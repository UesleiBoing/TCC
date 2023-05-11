import Classe from "./Classe";
import Form from "./Form";

export default interface Topic {
	id: number;
	description: string;
	class_id: number;
	form_id: number;
	order: number;

	classes?: Classe[];
	form?: Form;
}