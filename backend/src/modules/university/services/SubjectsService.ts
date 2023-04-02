import { hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';

import SubjectRequest from '../infra/http/requests/SubjectRequest';
import Subject from '../infra/typeorm/entities/Subject';
import ISubjectsRepository from '../repositories/ISubjectsRepository';

interface IRequest {
  title: string;
  content: string;
}

@injectable()
export default class SubjectsService extends Service {

  constructor(
    @inject('SubjectsRepository')
    protected repository: ISubjectsRepository,
  ) {
    super();
  }

  public entity = Subject;

  public async create(data: IRequest): Promise<Subject> {
    data = super.removeMask(data) as IRequest;

    let {
      title,
      content,
    } = data;

    await SubjectRequest.create({
      title,
      content,
    });

    let subject = await this.repository.create({
      title,
      content,
    });

    return subject;
  }

  public async update(id: number, data: IRequest): Promise<Subject | AppError | null> {
    data = super.removeMask(data) as IRequest;
    let {
      title,
      content,
    } = data;

    await SubjectRequest.update({
      id,
      title,
      content,
    });

    let subject = await this.repository.update(id, {
      title,
      content,
    });

    if (!subject) {
      return null;
    }

    return subject;
  }

  public async delete(id: number | number[] | object): Promise<any> {
    const deleted = await this.repository.delete(id);
    return deleted.affected;
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Subject | undefined> {
    await SubjectRequest.findOneFullData({ id });

    return this.repository.findOneFullData(id, data);
  }

}
