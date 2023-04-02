import { hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';

import AnswerRequest from '../infra/http/requests/AnswerRequest';
import Answer from '../infra/typeorm/entities/Answer';
import IAnswersRepository from '../repositories/IAnswersRepository';

interface IRequest {
  description: string;
  photo: string | null;
  question_id: number;
}

@injectable()
export default class AnswersService extends Service {

  constructor(
    @inject('AnswersRepository')
    protected repository: IAnswersRepository,
  ) {
    super();
  }

  public entity = Answer;

  public async create(data: IRequest): Promise<Answer> {
    data = super.removeMask(data) as IRequest;
    let {
      description,
      photo,
      question_id,
    } = data;

    await AnswerRequest.create({
      description,
      photo,
      question_id,
    });

    let object = await this.repository.create({
      description,
      photo,
      question_id,
    });

    return object;
  }

  public async update(id: number, data: IRequest): Promise<Answer | AppError | null> {
    data = super.removeMask(data) as IRequest;
    let {
      description,
      photo,
      question_id,
    } = data;

    await AnswerRequest.update({
      id,
      description,
      photo,
      question_id,
    });

    let object = await this.repository.update(id, {
      description,
      photo,
      question_id,
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

  public async findOneFullData(id: number, data: object = {}): Promise<Answer | undefined> {
    await AnswerRequest.findOneFullData({ id });

    return this.repository.findOneFullData(id, data);
  }

}
