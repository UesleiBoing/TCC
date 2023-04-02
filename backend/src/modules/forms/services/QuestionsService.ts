import { hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';

import QuestionRequest from '../infra/http/requests/QuestionRequest';
import Question from '../infra/typeorm/entities/Question';
import IQuestionsRepository from '../repositories/IQuestionsRepository';

interface IRequest {
  description: string;
  photo: string | null;
  type: number;
  correct_answer: number | null;
  weight: number;
  form_id: number;
}

@injectable()
export default class QuestionsService extends Service {

  constructor(
    @inject('QuestionsRepository')
    protected repository: IQuestionsRepository,
  ) {
    super();
  }

  public entity = Question;

  public async create(data: IRequest): Promise<Question> {
    data = super.removeMask(data) as IRequest;
    let {
      description,
      photo,
      type,
      correct_answer,
      weight,
      form_id,
    } = data;

    await QuestionRequest.create({
      description,
      photo,
      type,
      correct_answer,
      weight,
      form_id,
    });

    let object = await this.repository.create({
      description,
      photo,
      type,
      correct_answer,
      weight,
      form_id,
    });

    return object;
  }

  public async update(id: number, data: IRequest): Promise<Question | AppError | null> {
    data = super.removeMask(data) as IRequest;
    let {
      description,
      photo,
      type,
      correct_answer,
      weight,
      form_id,
    } = data;

    await QuestionRequest.update({
      description,
      photo,
      type,
      correct_answer,
      weight,
      form_id,
    });

    let object = await this.repository.update(id, {
      description,
      photo,
      type,
      correct_answer,
      weight,
      form_id,
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

  public async findOneFullData(id: number, data: object = {}): Promise<Question | undefined> {
    await QuestionRequest.findOneFullData({ id });

    return this.repository.findOneFullData(id, data);
  }

}
