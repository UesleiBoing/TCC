import {
  Answer, Class, Question, StudentAnswers, Test,
} from '@prisma/client';
import { injectable } from 'tsyringe';

import Service from '@shared/core/Service';
import client from '@shared/infra/prisma/client';

import TYPE_QUESTION from '../enums/TypeQuestion';

import QuestionsService from './QuestionsService';

interface IRequestTest {
  form_id: number
  student_id: number
  answers: IRequestAnswer[]
}

interface IRequestAnswer {
  question_id: number
  description: string | number | number[]
}

@injectable()
export default class TestsService extends Service {

  constructor(private questionsService: QuestionsService) {
    super();
  }

  client = client.test;

  public async findById(id: number) {
    const test = await this.client.findFirst({
      where: { id },
    });

    return test;
  }

  public async findAll(data: object = {}) {
    const tests = await super.findAll(data);

    return tests;
  }

  public handleGradeOfMultipleAlternative({
    answer,
    question,
  }: {
    answer: StudentAnswers & {
      question: Question | null
    }
    question: Question
  }) {
    const awnserArray = answer.description.split(', ');

    if (!question.correct_answer) {
      return question.weight.toNumber();
    }

    const questionCorrectAnswer = question.correct_answer.split(', ');

    const sumCorrectAwnsers = awnserArray.reduce((accumulator, awnser) => {
      accumulator += questionCorrectAnswer.includes(awnser) ? 1 : -1;
      return accumulator;
    }, 0);

    const finalGrade = sumCorrectAwnsers > 0
      ? question.weight.toNumber() * (sumCorrectAwnsers / questionCorrectAnswer.length)
      : 0;

    return finalGrade;
  }

  public generateGrade(
    test: Test & {
      studentAnswers: (StudentAnswers & {
        question: Question | null
      })[]
    },
  ) {
    let actualGrade = 0;
    let totalPoints = 0;
    let possibleOfCorrectGrade = 0;

    test.studentAnswers.forEach((answer) => {
      const { question } = answer;

      if (!question) {
        return;
      }

      totalPoints += question.weight.toNumber();

      if (question.type !== TYPE_QUESTION.DISCURSIVE || question.correct_answer) {
        possibleOfCorrectGrade += question.weight.toNumber();
      }

      if (question.type === TYPE_QUESTION.MULTIPLE_ALTERNATIVE) {
        const pointsQuestion = this.handleGradeOfMultipleAlternative({
          answer,
          question,
        });

        actualGrade += pointsQuestion;

        return;
      }

      if (answer.description === question.correct_answer) {
        actualGrade += question.weight.toNumber();
      }
    });

    return {
      grade: actualGrade,
      possibleOfCorrectGrade,
      totalPoints,
    };
  }

  public async create(data: IRequestTest) {
    data = super.removeMask(data) as IRequestTest;

    const { form_id, student_id, answers } = data;

    let test = await this.client.create({
      data: {
        form_id,
        student_id,
        studentAnswers: {
          create: answers.map(({ description, question_id }) => {
            if (Array.isArray(description)) {
              description = description.join(', ');
            }

            return {
              description: description.toString(),
              question_id,
            };
          }),
        },
      },

      include: {
        studentAnswers: {
          include: {
            question: true,
          },
        },
      },
    });

    const {
      grade,
      possibleOfCorrectGrade,
      totalPoints,
    } = this.generateGrade(test);

    const testUpdated = await this.client.update({
      data: {
        grade,
      },
      where: { id: test.id },
    });

    return {
      grade,
      possibleOfCorrectGrade,
      totalPoints,
      test: {
        ...test,
        ...testUpdated,
      },
    };
  }

  // public async findOneFullData(id: number, data: object = {}) {
  //   const test = await this.client.findFirst({
  //     where: { id },
  //     include: {
  //       answers: true,
  //     },
  //     ...data,
  //   });

  //   return test;
  // }

}
