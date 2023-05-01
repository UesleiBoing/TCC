import {
  Answer, Class, Keyword, Question,
} from '@prisma/client';
import { injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import AppError from '@shared/errors/AppError';
import client from '@shared/infra/prisma/client';

import TYPE_QUESTION from '../enums/TypeQuestion';
import AnswerRequest from '../infra/http/requests/AnswerRequest';
import QuestionRequest from '../infra/http/requests/QuestionRequest';

import AnswersService from './AnswersService';

interface IRequestQuestion {
  description: string;
  type: number;
  weight: number;
  form_id: number;
  photo?: string;
  order?: number;
  correct_answer?: string | string[];

  keywords: number[];
  answers?: IRequestAnswer[];
}

interface IRequestAnswer {
  id?: number;
  description: string;
  order?: number;
  value?: number;
}

@injectable()
export default class QuestionsService extends Service {

  constructor(
    private answersService: AnswersService,
  ) {
    super();
  }

  client = client.question;

  public async findById(id: number) {
    const question = await this.client.findFirst({
      where: { id },
      include: {
        answers: true,
        keywordQuestions: {
          select: {
            keyword: {
              select: {
                id: true,
                description: true,
                topic_id: true,
              },
            },
          },
        },
      },
    });

    return question;
  }

  public async findAll(data: object = {}) {
    const questions = await super.findAll(data);

    return questions;
  }

  public async findByTopic(topic_id: number) {
    const questions = await this.client.findMany({
      include: {
        keywordQuestions: {
          include: {
            keyword: true,
          },
        },
      },
      where: {
        keywordQuestions: {
          some: {
            keyword: {
              topic: {
                id: topic_id,
              },
            },
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    return questions;
  }

  public async create(data: IRequestQuestion): Promise<Question> {
    data = super.removeMask(data) as IRequestQuestion;

    let {
      description,
      type,
      correct_answer,
      weight,
      answers,
      order,
      keywords,
    } = data;

    await QuestionRequest.create({
      description,
      type,
      correct_answer,
      weight,
      order,
      keywords,
    });

    let createAnswersObj;
    if (type === TYPE_QUESTION.DISCURSIVE) {
      if (answers) {
        throw new AppError('Discursive questions cannot have answers', 404);
      }
    } else {
      createAnswersObj = {
        answers: {
          create: answers,
        },
      };
    }

    if (Array.isArray(correct_answer)) {
      if (type === TYPE_QUESTION.MULTIPLE_ALTERNATIVE) {
        correct_answer = correct_answer.join(', ');
      } else {
        throw new AppError('The correct answer must be just one, and not a array!', 404);
      }
    }

    if (answers) {
      answers.map(async (answer) => await AnswerRequest.create(answer));
    }

    order = await this.getOrderHandled({
      order,
    });

    const question = await this.client.create({
      data: {
        description,
        type,
        correct_answer,
        weight,
        order,
        ...createAnswersObj,
        keywordQuestions: {
          createMany: {
            data: keywords.map((keyword) => ({ keyword_id: keyword })),
          },
        },
      },
      include: {
        answers: true,
        keywordQuestions: {
          include: {
            keyword: true,
          },
        },
      },
    });

    return question;
  }

  public async update(id: number, data: IRequestQuestion) {
    data = super.removeMask(data) as IRequestQuestion;

    let {
      description,
      type,
      correct_answer,
      weight,
      order,
      answers,
      keywords,
    } = data;

    await QuestionRequest.update({
      id,
      description,
      type,
      correct_answer,
      weight,
      order,
      keywords,
    });

    if (Array.isArray(correct_answer)) {
      if (type === TYPE_QUESTION.MULTIPLE_ALTERNATIVE) {
        correct_answer = correct_answer.join(', ');
      } else {
        throw new AppError('The correct answer must be just one, and not a array!', 404);
      }
    }

    if (answers) {
      answers.map(async (answer) => await AnswerRequest.create(answer));

      const answersExists = await Promise.all(
        answers.map(async (answer) => {
          if (answer.id) {
            let answerUpdated = await this.answersService.update(
              answer.id,
              { ...answer, question_id: id },
            );

            return answerUpdated;
          }

          let answerCreated = await this.answersService.create(
            { ...answer, question_id: id },
          );

          return answerCreated;
        }),
      );

      await client.answer.deleteMany({
        where: {
          question_id: id,
          NOT: {
            id: {
              in: answersExists.map((answer) => answer.id),
            },
          },
        },
      });
    }

    order = await this.getOrderHandled({
      id,
      order,
    });

    const keywordsObjecs = keywords.map((keyword) => ({ keyword_id: keyword }));
    const question = await this.client.update({
      data: {
        description,
        type,
        correct_answer,
        weight,
        order,
        keywordQuestions: {
          deleteMany: { question_id: id },
          createMany: {
            data: keywordsObjecs,
          },
        },
      },
      include: {
        keywordQuestions: {
          include: {
            keyword: true,
          },
        },
      },
      where: { id },
    });

    return { ...question, answers };
  }

  public async delete(id: number) {
    await QuestionRequest.delete({ id });

    const deleted = await this.client.delete({ where: { id } });

    return deleted;
  }

  public async findOneFullData(id: number, data: object = {}) {
    const question = await this.client.findFirst({
      where: { id },
      include: {
        answers: true,
      },
      ...data,
    });

    return question;
  }

}
