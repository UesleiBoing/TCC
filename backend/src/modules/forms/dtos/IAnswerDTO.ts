import Question from '../infra/typeorm/entities/Question';

export default interface IAnswerDTO {
  id?: number;
  description: string;
  photo: string | null;

  question_id: number;
  question?: Question;
}
