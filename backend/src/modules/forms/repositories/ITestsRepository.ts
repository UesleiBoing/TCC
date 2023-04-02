import { DeleteResult } from 'typeorm';

import Test from '@modules/forms/infra/typeorm/entities/Test';

import ITestDTO from '../dtos/ITestDTO';

export default interface ITestsRepository {
  build(data: ITestDTO): Test;
  create(data: ITestDTO): Promise<Test>;
  update(id: number, data: ITestDTO): Promise<Test | undefined>;
  delete(conditions: number | object | number[]): Promise<DeleteResult>;
  find(data: object): Promise<Test[]>;
  findOne(id: number | object, data?: object): Promise<Test | undefined>;
  findOneFullData(id: number, data?: object): Promise<Test | undefined>;
}
