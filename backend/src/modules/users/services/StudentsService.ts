import { Student } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';
import client from '@shared/infra/prisma/client';

import StudentDTO from '../dtos/IStudentDTO';
import StudentRequest from '../infra/http/requests/StudentRequest';
import StudentUpdateNoPasswordRequest from '../infra/http/requests/StudentUpdateNoPasswordRequest';

interface IRequest {
  id?: number;
  email: string;
  name: string;
  password: string;
  actual_password?: string;
}

@injectable()
export default class StudentsService extends Service {

  client = client.student;

  public async numberFormsByStudent(student_id: number) {
    const testCount = await client.test.count({
      where: {
        student_id,
      },
    });

    return { quantity: testCount };
  }

  public async findById(id: number) {
    const student = await this.client.findFirst({ where: { id } });

    return student;
  }

  public async findAll(data: object = {}): Promise<Student[]> {
    const students = await super.findAll(data);

    return students;
  }

  public async create(data: IRequest) {
    data = super.removeMask(data) as IRequest;

    let {
      email,
      name,
      password,
    } = data;

    await StudentRequest.create({
      email,
      name,
      password,
    });

    const passwordHash = await hash(password, 8);

    const student = await this.client.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    });

    const studentDTO = student as StudentDTO;
    delete studentDTO.password;

    return studentDTO;
  }

  public async update(id: number, data: IRequest) {
    data = super.removeMask(data) as IRequest;

    let {
      email,
      name,
      actual_password,
      password,
    } = data;

    if (!password) {
      await StudentUpdateNoPasswordRequest.update({
        id,
        email,
        name,
        actual_password,
      });
    } else {
      await StudentRequest.update({
        id,
        email,
        name,
        password,
        actual_password,
      });
    }

    const studentToCompare = await this.client.findFirst({ where: { id } });

    if (!studentToCompare) {
      throw new AppError('Estudante não encontrado');
    }

    const passwordMatched = await compare(
      String(actual_password),
      studentToCompare.password,
    );

    if (!passwordMatched) {
      throw new AppError('Senha atual incorreta');
    }

    if (password) {
      password = await hash(password, 8);
    }

    const student = await this.client.update({
      data: {
        email,
        name,
        password,
      },
      where: { id },
    });

    const studentDTO = student as StudentDTO;
    delete studentDTO.password;

    return studentDTO;
  }

  public async delete(id: number) {
    await StudentRequest.delete({ id });

    const deleted = await this.client.delete({ where: { id } });

    return deleted;
  }

  public async findOneFullData(id: number, data: object = {}) {
    const student = await this.client.findFirst({ where: { id }, ...data });

    return student;
  }

}
