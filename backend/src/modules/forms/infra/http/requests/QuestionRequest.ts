import Joi from 'joi';

import Request from '@shared/core/Request';

export default class QuestionRequest extends Request {

  protected static rules: Joi.ObjectSchema<any> = Joi.object({
    description: Joi.string().required(),
    type: Joi.number().required(),
    form_id: Joi.number().required(),
    weight: Joi.number().required(),
    correct_answer: Joi.number().required(),
    photo: Joi.string(),
  });

}
