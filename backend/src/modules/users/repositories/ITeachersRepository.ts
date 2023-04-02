import { DeleteResult } from 'typeorm';

import Teacher from '@modules/users/infra/typeorm/entities/Teacher';

import ITeacherDTO from '../dtos/ITeacherDTO';

export default interface ITeachersRepository {
  build(data: ITeacherDTO): Teacher;
  create(data: ITeacherDTO): Promise<Teacher>;
  update(id: number, data: ITeacherDTO): Promise<Teacher | undefined>;
  delete(conditions: number | object | number[]): Promise<DeleteResult>;
  find(data: object): Promise<Teacher[]>;
  findByEmail(email: string): Promise<Teacher | undefined>;
  findOne(id: number | object, data?: object): Promise<Teacher | undefined>;
  findOneFullData(id: number, data?: object): Promise<Teacher | undefined>;

  findCreateValidation(data: ITeacherDTO): Promise<Teacher | undefined>;
  findUpdateValidation(data: ITeacherDTO): Promise<Teacher | undefined>;

  findToLogin(email: string): Promise<Teacher | undefined>;
}
