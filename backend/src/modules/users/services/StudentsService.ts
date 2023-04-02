import { hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';

import StudentRequest from '../infra/http/requests/StudentRequest';
import Student from '../infra/typeorm/entities/Student';
import IStudentsRepository from '../repositories/IStudentsRepository';

interface IRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

@injectable()
export default class StudentsService extends Service {

  constructor(
    @inject('StudentsRepository')
    protected repository: IStudentsRepository,
  ) {
    super();
  }

  public entity = Student;

  public async create(data: IRequest): Promise<Student> {
    data = super.removeMask(data) as IRequest;
    let {
      name,
      email,
      password,
    } = data;

    await StudentRequest.create({
      name,
      email,
      password,
    });

    const passwordHash = await hash(password, 8);

    let user = await this.repository.create({
      name,
      email,
      password: passwordHash,
    });

    delete user.password;

    return user;
  }

  public async update(id: number, data: IRequest): Promise<Student | AppError | null> {
    data = super.removeMask(data) as IRequest;
    let {
      name,
      email,
      password,
    } = data;

    await StudentRequest.update({
      id,
      name,
      email,
      password,
    });

    const passwordHash = await hash(password, 8);

    let user = await this.repository.update(id, {
      name,
      email,
      password: passwordHash,
    });

    if (!user) {
      return null;
    }

    delete user.password;

    return user;
  }

  public async delete(id: number | number[] | object): Promise<any> {
    const deleted = await this.repository.delete(id);
    return deleted.affected;
  }

  public async findOneFullData(id: number, data: object = {}): Promise<Student | undefined> {
    await StudentRequest.findOneFullData({ id });

    return this.repository.findOneFullData(id, data);
  }

}
