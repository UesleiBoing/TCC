import { hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';

import ClassRequest from '../infra/http/requests/ClassRequest';
import Classe from '../infra/typeorm/entities/Classe';
import IClassesRepository from '../repositories/IClassesRepository';

interface IRequest {
  title: string;
  content: string;
  year: number;
  semester: number;
  teacher_id: number;
  subject_id: number;
}

@injectable()
export default class ClassesService extends Service {

  constructor(
    @inject('ClassesRepository')
    protected repository: IClassesRepository,
  ) {
    super();
  }

  public entity = Classe;

  public async create(data: IRequest): Promise<Classe> {
    data = super.removeMask(data) as IRequest;

    let {
      title,
      content,
      year,
      semester,
      teacher_id,
      subject_id,
    } = data;

    await ClassRequest.create({
      title,
      content,
      year,
      semester,
      teacher_id,
      subject_id,
    });

    let classe = await this.repository.create({
      title,
      content,
      year,
      semester,
      teacher_id,
      subject_id,
    });

    return classe;
  }

  public async update(id: number, data: IRequest): Promise<Classe | AppError | null> {
    data = super.removeMask(data) as IRequest;
    let {
      title,
      content,
      year,
      semester,
      teacher_id,
      subject_id,
    } = data;

    await ClassRequest.update({
      id,
      title,
      content,
      year,
      semester,
      teacher_id,
      subject_id,
    });

    let classe = await this.repository.update(id, {
      title,
      content,
      year,
      semester,
      teacher_id,
      subject_id,
    });

    if (!classe) {
      return null;
    }

    return classe;
  }

  public async delete(id: number | number[] | object): Promise<any> {
    const deleted = await this.repository.delete(id);
    return deleted.affected;
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Classe | undefined> {
    await ClassRequest.findOneFullData({ id });

    return this.repository.findOneFullData(id, data);
  }

}
