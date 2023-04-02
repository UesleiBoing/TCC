import { hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';

import FormRequest from '../infra/http/requests/FormRequest';
import Form from '../infra/typeorm/entities/Form';
import IFormsRepository from '../repositories/IFormsRepository';

interface IRequest {
  title: string;
  description: string;
  order: number;
  topic_id: number;
}

@injectable()
export default class FormsService extends Service {

  constructor(
    @inject('FormsRepository')
    protected repository: IFormsRepository,
  ) {
    super();
  }

  public entity = Form;

  public async create(data: IRequest): Promise<Form> {
    data = super.removeMask(data) as IRequest;
    let {
      title,
      description,
      order,
      topic_id,
    } = data;

    await FormRequest.create({
      title,
      description,
      order,
      topic_id,
    });

    let object = await this.repository.create({
      title,
      description,
      order,
      topic_id,
    });

    return object;
  }

  public async update(id: number, data: IRequest): Promise<Form | AppError | null> {
    data = super.removeMask(data) as IRequest;
    let {
      title,
      description,
      order,
      topic_id,
    } = data;

    await FormRequest.update({
      id,
      title,
      description,
      order,
      topic_id,
    });

    let object = await this.repository.update(id, {
      title,
      description,
      order,
      topic_id,
    });

    if (!object) {
      return null;
    }

    return object;
  }

  public async delete(id: number | number[] | object): Promise<any> {
    const deleted = await this.repository.delete(id);
    return deleted.affected;
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Form | undefined> {
    await FormRequest.findOneFullData({ id });

    return this.repository.findOneFullData(id, data);
  }

}
