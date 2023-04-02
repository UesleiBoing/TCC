import { DeleteResult } from 'typeorm';

import Topic from '@modules/university/infra/typeorm/entities/Topic';

import ITopicDTO from '../dtos/ITopicDTO';

export default interface ITopicsRepository {
  build(data: ITopicDTO): Topic;
  create(data: ITopicDTO): Promise<Topic>;
  update(id: number, data: ITopicDTO): Promise<Topic | undefined>;
  delete(conditions: number | object | number[]): Promise<DeleteResult>;
  find(data: object): Promise<Topic[]>;
  findOne(id: number | object, data?: object): Promise<Topic | undefined>;
  findOneFullData(id: number, data?: object): Promise<Topic | undefined>;

  findCreateValidation(obj: ITopicDTO): Promise<Topic | undefined>
  findUpdateValidation(obj: ITopicDTO): Promise<Topic | undefined>

  lastOrder(class_id: number): Promise<number>
}
