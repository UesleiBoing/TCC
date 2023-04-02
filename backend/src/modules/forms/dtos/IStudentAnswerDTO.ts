import Question from '../infra/typeorm/entities/Question';
import Test from '../infra/typeorm/entities/Test';

export default interface IStudentAnswerDTO {
  id?: number;
  answer: string;
  status: number;

  question_id: number;
  question?: Question;

  test_id: number;
  test?: Test;
}
