import { DeleteResult } from 'typeorm';

import Question from '@modules/forms/infra/typeorm/entities/Question';

import IQuestionDTO from '../dtos/IQuestionDTO';

export default interface IQuestionsRepository {
  build(data: IQuestionDTO): Question;
  create(data: IQuestionDTO): Promise<Question>;
  update(id: number, data: IQuestionDTO): Promise<Question | undefined>;
  delete(conditions: number | object | number[]): Promise<DeleteResult>;
  find(data: object): Promise<Question[]>;
  findOne(id: number | object, data?: object): Promise<Question | undefined>;
  findOneFullData(id: number, data?: object): Promise<Question | undefined>;
}
