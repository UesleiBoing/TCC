import { Subject } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import client from '@shared/infra/prisma/client';

import SubjectRequest from '../infra/http/requests/SubjectRequest';

interface IRequest {
  id?: number;
  title: string;
  content: string;
}

@injectable()
export default class SubjectsService extends Service {

  client = client.subject;

  public async findById(id: number) {
    const subject = await this.client.findFirst({ where: { id } });

    return subject;
  }

  public async findAll(data: object = {}): Promise<Subject[]> {
    const subjects = await super.findAll(data);

    return subjects;
  }

  public async findByStudent(student_id: number) {
    const subjects = await this.client.findMany({
      include: {
        classes: true,
      },
      where: {
        classes: {
          every: {
            classes_students: {
              every: {
                student_id,
              },
            },
          },
        },
      },
    });

    return subjects;
  }

  public async create(data: IRequest) {
    data = super.removeMask(data) as IRequest;

    let { title, content } = data;

    await SubjectRequest.create({ title, content });

    const subject = await this.client.create({
      data: {
        title,
        content,
      },
    });

    return subject;
  }

  public async update(id: number, data: IRequest) {
    data = super.removeMask(data) as IRequest;

    let { title, content } = data;

    await SubjectRequest.update({ id, title, content });

    const subject = await this.client.update({
      data: {
        title,
        content,
      },
      where: { id },
    });

    return subject;
  }

  public async delete(id: number) {
    await SubjectRequest.delete({ id });

    const deleted = await this.client.delete({ where: { id } });

    return deleted;
  }

  public async findOneFullData(id: number, data: object = {}) {
    const subject = await this.client.findFirst({ where: { id }, ...data });

    return subject;
  }

}
