import { Student } from '@prisma/client';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import client from '@shared/infra/prisma/client';

import StudentDTO from '../dtos/IStudentDTO';
import StudentRequest from '../infra/http/requests/StudentRequest';

interface IRequest {
  id?: number;
  email: string;
  name: string;
  password: string;
}

@injectable()
export default class StudentsService extends Service {

  client = client.student;

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
      password,
    } = data;

    await StudentRequest.update({
      id,
      email,
      name,
      password,
    });

    const passwordHash = await hash(password, 8);

    const student = await this.client.update({
      data: {
        email,
        name,
        password: passwordHash,
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
