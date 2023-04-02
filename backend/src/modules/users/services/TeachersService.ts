import { hash } from 'bcryptjs';
import { container, inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';

import TeacherRequest from '../infra/http/requests/TeacherRequest';
import Teacher from '../infra/typeorm/entities/Teacher';
import ITeachersRepository from '../repositories/ITeachersRepository';

interface IRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

@injectable()
export default class TeachersService extends Service {

  constructor(
    @inject('TeachersRepository')
    protected repository: ITeachersRepository,
  ) {
    super();
  }

  public entity = Teacher;

  public async create(data: IRequest): Promise<Teacher> {
    data = super.removeMask(data) as IRequest;
    let {
      name,
      email,
      password,
    } = data;

    await TeacherRequest.create({
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

  public async update(id: number, data: IRequest): Promise<Teacher | AppError | null> {
    data = super.removeMask(data) as IRequest;
    let {
      name,
      email,
      password,
    } = data;

    await TeacherRequest.update({
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

  public async findOneFullData(id: number, data: object = {}): Promise<Teacher | undefined> {
    await TeacherRequest.findOneFullData({ id });

    return this.repository.findOneFullData(id, data);
  }

}
