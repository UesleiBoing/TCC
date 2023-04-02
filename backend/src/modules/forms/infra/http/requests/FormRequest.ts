import Joi from 'joi';

import Request from '@shared/core/Request';

export default class FormRequest extends Request {

  protected static rules: Joi.ObjectSchema<any> = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    topic_id: Joi.number().required(),
    order: Joi.number().required(),
  });

}
