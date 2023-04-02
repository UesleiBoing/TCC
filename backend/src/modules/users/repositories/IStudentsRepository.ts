import { DeleteResult } from 'typeorm';

import Student from '@modules/users/infra/typeorm/entities/Student';

import IStudentDTO from '../dtos/IStudentDTO';

export default interface IStudentsRepository {
  build(data: IStudentDTO): Student;
  create(data: IStudentDTO): Promise<Student>;
  update(id: number, data: IStudentDTO): Promise<Student | undefined>;
  delete(conditions: number | object | number[]): Promise<DeleteResult>;
  find(data: object): Promise<Student[]>;
  findByEmail(email: string): Promise<Student | undefined>;
  findOne(id: number | object, data?: object): Promise<Student | undefined>;
  findOneFullData(id: number, data?: object): Promise<Student | undefined>;

  findCreateValidation(data: IStudentDTO): Promise<Student | undefined>;
  findUpdateValidation(data: IStudentDTO): Promise<Student | undefined>;

  findToLogin(email: string): Promise<Student | undefined>;
}
