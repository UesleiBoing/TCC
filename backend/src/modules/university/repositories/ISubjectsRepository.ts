import { DeleteResult } from 'typeorm';

import Subject from '@modules/university/infra/typeorm/entities/Subject';

import ISubjectDTO from '../dtos/ISubjectDTO';

export default interface ISubjectsRepository {
  build(data: ISubjectDTO): Subject;
  create(data: ISubjectDTO): Promise<Subject>;
  update(id: number, data: ISubjectDTO): Promise<Subject | undefined>;
  delete(conditions: number | object | number[]): Promise<DeleteResult>;
  find(data: object): Promise<Subject[]>;
  findOne(id: number | object, data?: object): Promise<Subject | undefined>;
  findOneFullData(id: number, data?: object): Promise<Subject | undefined>;
}
