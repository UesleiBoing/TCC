import Joi from 'joi';
import { container } from 'tsyringe';

import Request from '@shared/core/Request';
import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';
import ValidationHelper from '@shared/helpers/ValidationHelper';

import ITeacherDTO from '@modules/users/dtos/ITeacherDTO';

import TeachersRepository from '../../typeorm/repositories/TeachersRepository';

export default class TeacherRequest extends Request {

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

    const teachersRepository = container.resolve(TeachersRepository);

    let teacher = await teachersRepository.findCreateValidation({ email } as ITeacherDTO);

    if (!teacher) {
      return;
    }

    if (teacher.email === email) {
      throw new AppError(ErrorMessages.TEACHER_UNIQUE_EMAIL, 422);
    }
  }

  public static async rulesUpdate({
    id,
    name,
    email,
    password,
  }: any): Promise<void> {
    ValidationHelper.validationPassword(password);

    const teachersRepository = container.resolve(TeachersRepository);
    let teacher = await teachersRepository.findUpdateValidation({ id, email } as ITeacherDTO);

    if (!teacher) {
      throw new AppError(ErrorMessages.TEACHER_DOESNT_EXIST, 404);
    }

    if (teacher.id !== id) {
      if (teacher.email === email) {
        throw new AppError(ErrorMessages.TEACHER_UNIQUE_EMAIL, 422);
      }
    }

  }

}
