import Joi from 'joi';

import Request from '@shared/core/Request';

export default class SubjectRequest extends Request {

  protected static rules: Joi.ObjectSchema<any> = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

}
