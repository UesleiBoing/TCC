import Joi from 'joi';
import { container } from 'tsyringe';

import Request from '@shared/core/Request';
import AppError from '@shared/errors/AppError';
import ErrorMessages from '@shared/errors/ErrorMessages';

import ITopicDTO from '@modules/university/dtos/ITopicDTO';

import ClassesRepository from '../../typeorm/repositories/ClassesRepository';
import TopicsRepository from '../../typeorm/repositories/TopicsRepository';

export default class TopicRequest extends Request {

  protected static rules: Joi.ObjectSchema<any> = Joi.object({
    description: Joi.string().required(),
    order: Joi.number(),
    class_id: Joi.number().required(),
  });

  public static async rulesCreate({
    class_id,
    order,
  }: any): Promise<void> {

    const classesRepository = container.resolve(ClassesRepository);
    let classe = await classesRepository.findCreateValidation({ class_id } as ITopicDTO);

    if (!classe) {
      throw new AppError(ErrorMessages.CLASS_DOESNT_EXIST, 422);
    }

  }

  public static async rulesUpdate({
    class_id,
    order,
  }: any): Promise<void> {

    const classesRepository = container.resolve(ClassesRepository);
    let classe = await classesRepository.findCreateValidation({ class_id } as ITopicDTO);

    if (!classe) {
      throw new AppError(ErrorMessages.CLASS_DOESNT_EXIST, 422);
    }

  }

}
