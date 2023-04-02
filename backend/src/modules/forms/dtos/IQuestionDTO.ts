import Form from '../infra/typeorm/entities/Form';

export default interface IQuestionDTO {
  id?: number;
  description: string;
  photo: string | null;
  type: number;
  correct_answer: number | null;
  weight: number;

  form_id: number;
  form?: Form;
}
