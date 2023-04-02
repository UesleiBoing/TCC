import Joi from 'joi';

import Request from '@shared/core/Request';

export default class ClassRequest extends Request {

  protected static rules: Joi.ObjectSchema<any> = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    year: Joi.number().min(2022).max(2028).required(),
    semester: Joi.number().min(1).max(2).required(),
  });

}
