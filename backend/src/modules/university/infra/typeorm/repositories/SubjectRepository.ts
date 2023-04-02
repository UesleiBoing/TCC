import { Not, Repository as TypeORMRepository, getRepository } from 'typeorm';

import Repository from '@shared/infra/typeorm/repositories/Repository';

import ISubjectsRepository from '@modules/university/repositories/ISubjectsRepository';

import ISubjectDTO from '../../../dtos/ISubjectDTO';
import Subject from '../entities/Subject';

export default class SubjectsRepository extends Repository implements ISubjectsRepository {

  protected ormRepository: TypeORMRepository<Subject>;

  constructor() {
    super();
    this.ormRepository = getRepository(Subject);
  }

  public build(user: ISubjectDTO): Subject {
    return super.build(user);
  }

  public async create(data: ISubjectDTO): Promise<Subject> {
    return super.create(data);
  }

  public async update(id: number, user: ISubjectDTO): Promise<Subject> {
    return super.update(id, user);
  }

  public async findOne(id: number | object, data: object = {}): Promise<Subject> {
    return super.findOne(id, data);
  }

  public async find(data: object = {}): Promise<Subject[]> {
    return super.find(data);
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Subject | undefined> {
    return this.ormRepository.findOne(id, {
      relations: [
      ],
    });
  }

}
