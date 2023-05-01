import { Class } from '@prisma/client';
import { injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import client from '@shared/infra/prisma/client';

import ITeacherDTO from '../../users/dtos/ITeacherDTO';
import ClassRequest from '../infra/http/requests/ClassRequest';

interface IRequest {
  title: string;
  content: string;
  year: number;
  semester: number;
  teacher_id: number;
  subject_id: number;
  students: number[];
}

@injectable()
export default class ClassesService extends Service {

  client = client.class;

  public async findById(id: number) {
    const classe = await this.client.findFirst({
      where: { id },

      include: {
        subject: true,
        teacher: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        classes_students: {
          include: {
            student: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return classe;
  }

  public async findByStudent(student_id: number) {
    const subjects = await this.client.findMany({
      include: {
        subject: true,
        teacher: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      where: {
        classes_students: {
          every: {
            student_id,
          },
        },
      },
    });

    return subjects;
  }

  public async findAll(data: object = {}): Promise<Class[]> {
    const classes = await super.findAll({
      include: {
        teacher: true,
        subject: true,
      },
    });

    return classes;
  }

  public prepareStudents(students?: number[]) {
    if (!students) {
      return {};
    }

    return {
      classes_students: {
        createMany: {
          data: students.map((student) => ({ student_id: student })),
        },
      },
    };
  }

  public async create(data: IRequest): Promise<Class> {
    data = super.removeMask(data) as IRequest;

    let {
      title,
      content,
      year,
      semester,
      teacher_id,
      subject_id,
      students,
    } = data;

    await ClassRequest.create({
      title,
      content,
      year,
      semester,
      teacher_id,
      subject_id,
    });

    const classe = await this.client.create({
      data: {
        title,
        content,
        year: year.toString(),
        semester: semester.toString(),
        teacher_id,
        subject_id,
        ...this.prepareStudents(students),
      },
      include: {
        classes_students: {
          select: {
            student: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return classe;
  }

  public async update(id: number, data: IRequest): Promise<Class> {
    data = super.removeMask(data) as IRequest;

    let {
      title,
      content,
      year,
      semester,
      teacher_id,
      subject_id,
      students,
    } = data;

    await ClassRequest.update({
      id,
      title,
      content,
      year,
      semester,
      teacher_id,
      subject_id,
    });

    if (students) {
      await client.classStudent.deleteMany({
        where: {
          class_id: id,
        },
      });
    }

    const classe = await this.client.update({
      data: {
        title,
        content,
        year: year.toString(),
        semester: semester.toString(),
        teacher_id,
        subject_id,
        ...this.prepareStudents(students),
      },
      include: {
        classes_students: {
          select: {
            student: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
      where: { id },
    });

    return classe;
  }

  public async delete(id: number) {
    await ClassRequest.delete({ id });

    const deleted = await this.client.delete({ where: { id } });

    return deleted;
  }

  public async findOneFullData(id: number, data: object = {}) {
    const classe = await this.client.findFirst({ where: { id }, ...data });

    return classe;
  }

}
