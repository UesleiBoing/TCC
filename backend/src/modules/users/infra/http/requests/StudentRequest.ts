import Joi from 'joi';
import { container } from 'tsyringe';

import Request from '@shared/core/Request';
import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';
import ValidationHelper from '@shared/helpers/ValidationHelper';

import IStudentDTO from '@modules/users/dtos/IStudentDTO';

import StudentsRepository from '../../typeorm/repositories/StudentsRepository';

export default class StudentRequest extends Request {

  protected static rules: Joi.ObjectSchema<any> = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  public static async rulesCreate({
    name,
    email,
    password,
  }: any): Promise<void> {

    ValidationHelper.validationPassword(password);

    const studentsRepository = container.resolve(StudentsRepository);

    let student = await studentsRepository.findCreateValidation({ email } as IStudentDTO);

    if (!student) {
      return;
    }

    if (student.email === email) {
      throw new AppError(ErrorMessages.STUDENT_UNIQUE_EMAIL, 422);
    }
  }

  public static async rulesUpdate({
    id,
    name,
    email,
    password,
  }: any): Promise<void> {
    ValidationHelper.validationPassword(password);

    const studentsRepository = container.resolve(StudentsRepository);
    let student = await studentsRepository.findUpdateValidation({ id, email } as IStudentDTO);

    if (!student) {
      throw new AppError(ErrorMessages.STUDENT_DOESNT_EXIST, 404);
    }

    if (student.id !== id) {
      if (student.email === email) {
        throw new AppError(ErrorMessages.STUDENT_UNIQUE_EMAIL, 422);
      }
    }

  }

}
