import { hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';
import { Not } from 'typeorm';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';

import TopicRequest from '../infra/http/requests/TopicRequest';
import Topic from '../infra/typeorm/entities/Topic';
import ITopicsRepository from '../repositories/ITopicsRepository';

interface IRequest {
  description: string;
  order: number;
  class_id: number;
}

@injectable()
export default class TopicsService extends Service {

  constructor(
    @inject('TopicsRepository')
    protected repository: ITopicsRepository,
  ) {
    super();
  }

  public entity = Topic;

  public async create(data: IRequest): Promise<Topic> {
    data = super.removeMask(data) as IRequest;

    let {
      description,
      order,
      class_id,
    } = data;

    await TopicRequest.create({
      description,
      order,
      class_id,
    });

    const actualOrder = Number.isNaN(order)
      ? await this.repository.lastOrder(class_id) + 1
      : order;

    let topic = await this.repository.create({
      order: actualOrder,
      description,
      class_id,
    });

    return topic;
  }

  public async update(id: number, data: IRequest): Promise<Topic | AppError | null> {
    data = super.removeMask(data) as IRequest;
    let {
      description,
      order,
      class_id,
    } = data;

    await TopicRequest.update({
      id,
      description,
      order,
      class_id,
    });

    /**
     * 1
     * 2
     * 3
     * 4
     * 5
     */

    const actualOrder = Number.isNaN(order)
      ? await this.repository.lastOrder(class_id) + 1
      : await this.repository.checkOrder({ class_id, order });

    let topic = await this.repository.update(id, {
      order: actualOrder,
      description,
      class_id,
    });

    if (!topic) {
      return null;
    }

    return topic;
  }

  public async delete(id: number | number[] | object): Promise<any> {
    const deleted = await this.repository.delete(id);
    return deleted.affected;
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Topic | undefined> {
    await TopicRequest.findOneFullData({ id });

    return this.repository.findOneFullData(id, data);
  }

}
