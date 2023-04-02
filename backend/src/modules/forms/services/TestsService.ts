import { hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';

import TestRequest from '../infra/http/requests/TestRequest';
import Test from '../infra/typeorm/entities/Test';
import ITestsRepository from '../repositories/ITestsRepository';

interface IRequest {
  grade: number;
  student_id: number;
  form_id: number;
}

@injectable()
export default class TestsService extends Service {

  constructor(
    @inject('TestsRepository')
    protected repository: ITestsRepository,
  ) {
    super();
  }

  public entity = Test;

  public async create(data: IRequest): Promise<Test> {
    data = super.removeMask(data) as IRequest;
    let {
      grade,
      student_id,
      form_id,
    } = data;

    await TestRequest.create({
      grade,
      student_id,
      form_id,
    });

    let object = await this.repository.create({
      grade,
      student_id,
      form_id,
    });

    return object;
  }

  public async update(id: number, data: IRequest): Promise<Test | AppError | null> {
    data = super.removeMask(data) as IRequest;
    let {
      grade,
      student_id,
      form_id,
    } = data;

    await TestRequest.update({
      id,
      grade,
      student_id,
      form_id,
    });

    let object = await this.repository.update(id, {
      grade,
      student_id,
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

  public async findOneFullData(id: number, data: object = {}): Promise<Test | undefined> {
    await TestRequest.findOneFullData({ id });

    return this.repository.findOneFullData(id, data);
  }

}
