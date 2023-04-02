import { DeleteResult } from 'typeorm';

import StudentAnswer from '@modules/forms/infra/typeorm/entities/StudentAnswer';

import IStudentAnswerDTO from '../dtos/IStudentAnswerDTO';

export default interface IStudentAnswersRepository {
  build(data: IStudentAnswerDTO): StudentAnswer;
  create(data: IStudentAnswerDTO): Promise<StudentAnswer>;
  update(id: number, data: IStudentAnswerDTO): Promise<StudentAnswer | undefined>;
  delete(conditions: number | object | number[]): Promise<DeleteResult>;
  find(data: object): Promise<StudentAnswer[]>;
  findOne(id: number | object, data?: object): Promise<StudentAnswer | undefined>;
  findOneFullData(id: number, data?: object): Promise<StudentAnswer | undefined>;
}
