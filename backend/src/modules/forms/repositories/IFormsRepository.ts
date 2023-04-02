import { DeleteResult } from 'typeorm';

import Form from '@modules/forms/infra/typeorm/entities/Form';

import IFormDTO from '../dtos/IFormDTO';

export default interface IFormsRepository {
  build(data: IFormDTO): Form;
  create(data: IFormDTO): Promise<Form>;
  update(id: number, data: IFormDTO): Promise<Form | undefined>;
  delete(conditions: number | object | number[]): Promise<DeleteResult>;
  find(data: object): Promise<Form[]>;
  findOne(id: number | object, data?: object): Promise<Form | undefined>;
  findOneFullData(id: number, data?: object): Promise<Form | undefined>;
}
