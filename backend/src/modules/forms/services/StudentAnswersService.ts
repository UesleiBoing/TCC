import { hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';

import StudentAnswerRequest from '../infra/http/requests/StudentAnswerRequest';
import StudentAnswer from '../infra/typeorm/entities/StudentAnswer';
import IStudentAnswersRepository from '../repositories/IStudentAnswersRepository';

interface IRequest {
  answer: string;
  status: number;
  question_id: number;
  test_id: number;
}

@injectable()
export default class StudentAnswersService extends Service {

  constructor(
    @inject('StudentAnswersRepository')
    protected repository: IStudentAnswersRepository,
  ) {
    super();
  }

  public entity = StudentAnswer;

  public async create(data: IRequest): Promise<StudentAnswer> {
    data = super.removeMask(data) as IRequest;
    let {
      answer,
      status,
      question_id,
      test_id,
    } = data;

    await StudentAnswerRequest.create({
      answer,
      status,
      question_id,
      test_id,
    });

    let object = await this.repository.create({
      answer,
      status,
      question_id,
      test_id,
    });

    return object;
  }

  public async update(id: number, data: IRequest): Promise<StudentAnswer | AppError | null> {
    data = super.removeMask(data) as IRequest;
    let {
      answer,
      status,
      question_id,
      test_id,
    } = data;

    await StudentAnswerRequest.update({
      id,
      answer,
      status,
      question_id,
      test_id,
    });

    let object = await this.repository.update(id, {
      answer,
      status,
      question_id,
      test_id,
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

  public async findOneFullData(id: number, data: object = {}): Promise<StudentAnswer | undefined> {
    await StudentAnswerRequest.findOneFullData({ id });

    return this.repository.findOneFullData(id, data);
  }

}
