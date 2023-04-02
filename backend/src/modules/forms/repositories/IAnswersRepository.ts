import { DeleteResult } from 'typeorm';

import Answer from '@modules/forms/infra/typeorm/entities/Answer';

import IAnswerDTO from '../dtos/IAnswerDTO';

export default interface IAnswersRepository {
  build(data: IAnswerDTO): Answer;
  create(data: IAnswerDTO): Promise<Answer>;
  update(id: number, data: IAnswerDTO): Promise<Answer | undefined>;
  delete(conditions: number | object | number[]): Promise<DeleteResult>;
  find(data: object): Promise<Answer[]>;
  findOne(id: number | object, data?: object): Promise<Answer | undefined>;
  findOneFullData(id: number, data?: object): Promise<Answer | undefined>;
}
