import { Answer } from '@prisma/client';
import { injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import client from '@shared/infra/prisma/client';

import AnswerRequest from '../infra/http/requests/AnswerRequest';

interface IRequest {
  description: string;
  order?: number;
  photo?: string;
  value?: number;
  question_id: number;
}

@injectable()
export default class AnswersService extends Service {

  client = client.answer;

  public async findById(id: number) {
    const answer = await this.client.findFirst({
      where: { id },
    });

    return answer;
  }

  public async findAll(data: object = {}) {
    const answers = await super.findAll(data);

    return answers;
  }

  public async create(data: IRequest): Promise<Answer> {
    data = super.removeMask(data) as IRequest;

    let {
      description,
      photo,
      question_id,
      order,
      value,
    } = data;

    await AnswerRequest.create({
      description,
      photo,
      question_id,
      value,
      order,
    });

    order = await this.getOrderHandled({ order });

    const answer = await this.client.create({
      data: {
        description,
        photo,
        question_id,
        value,
        order,
      },
    });

    return answer;
  }

  public async update(id: number, data: IRequest): Promise<Answer> {
    data = super.removeMask(data) as IRequest;

    let {
      description,
      photo,
      question_id,
      value,
      order,
    } = data;

    await AnswerRequest.update({
      id,
      description,
      photo,
      value,
      question_id,
      order,
    });

    order = await this.getOrderHandled({ id, order });

    const answer = await this.client.update({
      data: {
        description,
        photo,
        value,
        question_id,
        order,
      },
      where: { id },
    });

    return answer;
  }

  public async delete(id: number) {
    await AnswerRequest.delete({ id });

    const deleted = await this.client.delete({ where: { id } });

    return deleted;
  }

  public async findOneFullData(id: number, data: object = {}) {
    const answer = await this.client.findFirst({
      where: { id },
      ...data,
    });

    return answer;
  }

}
