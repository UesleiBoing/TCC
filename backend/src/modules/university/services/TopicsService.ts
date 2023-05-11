import { injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import client from '@shared/infra/prisma/client';

import TopicRequest from '../infra/http/requests/TopicRequest';

interface IRequest {
  description: string;
  order: number;
  class_id: number;
}

@injectable()
export default class TopicsService extends Service {

  client = client.topic;

  public async findById(id: number) {
    const topic = await this.client.findFirst({
      where: { id },
      include: {
        forms: {
          where: {
            standard: true,
          },
        },
      },
    });

    return topic;
  }

  public async findAll(data: object = {}) {
    const topics = await this.client.findMany({
      orderBy: [
        { class_id: 'asc' },
        { order: 'asc' },
      ],
      include: {
        classes: true,
      },
    });

    return topics;
  }

  public async findByStudent(student_id: number) {
    const topics = await this.client.findMany({
      include: {
        classes: true,
      },
      where: {
        classes: {
          classes_students: {
            some: {
              student_id,
            },
          },
        },
      },
    });

    return topics;
  }

  public async findKeywords(id: number) {
    const topics = await this.client.findFirst({
      where: { id },
      include: {
        keywords: true,
      },
    });

    return topics;
  }

  public async create(data: IRequest) {
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

    order = await this.getOrderHandled({
      order,
    });

    const topic = await this.client.create({
      data: {
        description,
        order,
        class_id: Number(class_id),
        forms: {
          create: {
            title: `Formulário de ${description}`,
            description: `Formulário referente ao tópico de ${description}`,
            order: 0,
            standard: true,
            active: false,
          },
        },
      },
    });

    return topic;
  }

  public async update(id: number, data: IRequest) {
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

    order = await this.getOrderHandled({
      id,
      order,
    });

    let topic = await this.client.update({
      data: {
        description,
        order,
        class_id: Number(class_id),
      },
      where: { id },
    });

    return topic;
  }

  public async delete(id: number) {
    await TopicRequest.delete({ id });

    const deleted = await this.client.delete({ where: { id } });

    return deleted;
  }

  public async findOneFullData(id: number, data: object = {}) {
    const topic = await this.client.findFirst({ where: { id }, ...data });

    return topic;
  }

}
