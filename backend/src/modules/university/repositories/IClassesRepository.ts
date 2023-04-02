import { DeleteResult } from 'typeorm';

import Classe from '@modules/university/infra/typeorm/entities/Classe';

import IClassDTO from '../dtos/IClassDTO';

export default interface IClassesRepository {
  build(data: IClassDTO): Classe;
  create(data: IClassDTO): Promise<Classe>;
  update(id: number, data: IClassDTO): Promise<Classe | undefined>;
  delete(conditions: number | object | number[]): Promise<DeleteResult>;
  find(data: object): Promise<Classe[]>;
  findOne(id: number | object, data?: object): Promise<Classe | undefined>;
  findOneFullData(id: number, data?: object): Promise<Classe | undefined>;
}
