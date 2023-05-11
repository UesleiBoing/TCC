import {
  Answer, Class, Form, Prisma, Question,
} from '@prisma/client';
import { injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import client from '@shared/infra/prisma/client';

import FormGenerateRequest from '../infra/http/requests/FormGenerateRequest';
import FormRequest from '../infra/http/requests/FormRequest';

interface IRequest {
  title: string
  description: string
  order?: number
  topic_id: number
  active: boolean

  questions: number[]
}

interface RequestGenerate {
  quantity: number;
  title: string;
  description: string;
  topic_id: number;
  keywords: number[];
}

interface FindByTopic {
  topic_id: number
  // topic_name: string;
}

interface QuestionFromRequest extends Question {
  answers?: Answer[]
}

interface RequestFindById {
  questions?: string;
  answers?: string;
}

@injectable()
export default class FormsService extends Service {

  client = client.form;

  public async findByTopic({ topic_id }: FindByTopic) {
    const form = await this.client.findMany({
      where: { topic_id },
      orderBy: { id: 'asc' },
    });

    return form;
  }

  public async findFormsOfStudent(student_id: number) {
    const forms = await this.client.findMany({
      where: {
        active: true,
        topic: {
          classes: {
            classes_students: {
              some: {
                student_id,
              },
            },
          },
        },
        tests: {
        },
      },
      include: {
        tests: {
          where: {
            student_id,
          },
          take: 1,
          orderBy: {
            grade_ten: 'desc',
          },
        },
        topic: {
          include: {
            classes: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    return forms;
  }

  handleIncludesInFindById({ questions, answers }: RequestFindById): object | undefined {
    let includeAnswers;
    if (answers) {
      includeAnswers = answers
        ? { include: { answers: { orderBy: { order: 'asc' } } } }
        : true;
    }

    let includeFormQuestions;
    let includeQuestions;
    if (questions) {
      includeQuestions = questions
        ? {
          include: { question: includeAnswers },
          orderBy: { question: { order: 'asc' } },
        }
        : undefined;

      includeFormQuestions = { include: { formQuestions: includeQuestions } };
    }

    return includeFormQuestions;
  }

  public async findById(
    id: number,
    { questions, answers }: RequestFindById = {},
  ) {
    const handleIncludes = this.handleIncludesInFindById({ questions, answers });

    const form = await this.client.findFirst({
      where: { id },
      ...handleIncludes,
    });

    return form;
  }

  public async findAll(data: object = {}) {
    const forms = await super.findAll(data);

    return forms;
  }

  public async generate({ quantity, keywords, ...data }: RequestGenerate) {
    await FormGenerateRequest.create({ quantity });

    const questions = await client.$queryRaw`
     SELECT questions.id
       FROM questions
       JOIN keywords_questions ON
            keywords_questions.question_id = questions.id
      WHERE keywords_questions.keyword_id IN (${Prisma.join(keywords)})
      ORDER BY RANDOM()
      LIMIT ${quantity || 10};
    `;

    const questionsIds = (questions as Question[]).map((question: Question) => question.id);

    const formCreated = this.create({
      ...data,
      questions: questionsIds,
      active: true,
    });

    return formCreated;
  }

  public prepareQuestions(questions?: number[]) {
    if (!questions) {
      return {};
    }

    return {
      formQuestions: {
        createMany: {
          data: questions.map((question) => ({ question_id: question })),
        },
      },
    };
  }

  public async create(data: IRequest): Promise<Form> {
    data = super.removeMask(data) as IRequest;

    let {
      title, description, order, topic_id, questions, active,
    } = data;

    await FormRequest.create({
      title,
      description,
      order,
      topic_id,
      questions,
    });

    const orderHandled = await this.getOrderHandled({ order });

    const form = await this.client.create({
      data: {
        title,
        description,
        order: orderHandled,
        topic_id,
        active,
        formQuestions: {
          createMany: {
            data: questions.map((question) => ({ question_id: question })),
          },
        },
      },

      include: {
        formQuestions: {
          include: {
            question: true,
          },
        },
      },
    });

    return form;
  }

  public async update(id: number, data: IRequest): Promise<Form> {
    data = super.removeMask(data) as IRequest;

    let {
      title, description, order, topic_id, questions, active,
    } = data;

    await FormRequest.update({
      id,
      title,
      description,
      order,
      topic_id,
      questions,
      active,
    });

    const orderHandled = await this.getOrderHandled({
      id,
      order,
    });

    if (questions) {
      await client.formQuestion.deleteMany({
        where: {
          form_id: id,
        },
      });
    }
    const form = await this.client.update({
      data: {
        title,
        description,
        order: orderHandled,
        topic_id,
        active,
        ...this.prepareQuestions(questions),
      },
      where: { id },
    });

    return form;
  }

  public async delete(id: number) {
    await FormRequest.delete({ id });

    const deleted = await this.client.delete({ where: { id } });

    return deleted;
  }

  public async findOneFullData(id: number, data: object = {}) {
    const form = await this.client.findFirst({
      where: { id },
      include: {
        formQuestions: {
          include: {
            question: {
              include: {
                answers: true,
              },
            },
          },
        },
      },
      ...data,
    });

    return form;
  }

}
