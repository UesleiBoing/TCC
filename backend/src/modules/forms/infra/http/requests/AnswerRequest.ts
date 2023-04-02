import Joi from 'joi';

import Request from '@shared/core/Request';

export default class AnswerRequest extends Request {

  protected static rules: Joi.ObjectSchema<any> = Joi.object({
    description: Joi.string().required(),
    photo: Joi.string(),
    question_id: Joi.number().required(),
  });

}
