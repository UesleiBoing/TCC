import { Teacher } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';
import client from '@shared/infra/prisma/client';

import TeacherDTO from '../dtos/ITeacherDTO';
import TeacherRequest from '../infra/http/requests/TeacherRequest';
import TeacherUpdateNoPasswordRequest from '../infra/http/requests/TeacherUpdateNoPasswordRequest';

interface IRequest {
  id?: number;
  email: string;
  name: string;
  password: string;
  actual_password?: string;
}

@injectable()
export default class TeachersService extends Service {

  client = client.teacher;

  public async findById(id: number) {
    const teacher = await this.client.findFirst({ where: { id } });

    return teacher;
  }

  public async findAll(data: object = {}): Promise<Teacher[]> {
    const teachers = await super.findAll(data);

    return teachers;
  }

  public async create(data: IRequest) {
    data = super.removeMask(data) as IRequest;

    let {
      email,
      name,
      password,
    } = data;

    await TeacherRequest.create({
      email,
      name,
      password,
    });

    const passwordHash = await hash(password, 8);

    const teacher = await this.client.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    });

    const teacherDTO = teacher as TeacherDTO;
    delete teacherDTO.password;

    return teacherDTO;
  }

  public async update(id: number, data: IRequest) {
    data = super.removeMask(data) as IRequest;

    let {
      email,
      name,
      password,
      actual_password,
    } = data;

    if (!password) {
      await TeacherUpdateNoPasswordRequest.update({
        id,
        email,
        name,
        actual_password,
      });
    } else {
      await TeacherRequest.update({
        id,
        email,
        name,
        password,
        actual_password,
      });
    }

    const teacherToCompare = await this.client.findFirst({ where: { id } });

    if (!teacherToCompare) {
      throw new AppError('Professor não encontrado');
    }

    const passwordMatched = await compare(
      String(actual_password),
      teacherToCompare.password,
    );

    if (!passwordMatched) {
      throw new AppError('Senha atual incorreta');
    }

    if (password) {
      password = await hash(password, 8);
    }

    const teacher = await this.client.update({
      data: {
        email,
        name,
        password,
      },
      where: { id },
    });

    const teacherDTO = teacher as TeacherDTO;
    delete teacherDTO.password;

    return teacherDTO;
  }

  public async delete(id: number) {
    await TeacherRequest.delete({ id });

    const deleted = await this.client.delete({ where: { id } });

    return deleted;
  }

  public async findOneFullData(id: number, data: object = {}) {
    const teacher = await this.client.findFirst({ where: { id }, ...data });

    return teacher;
  }

}
