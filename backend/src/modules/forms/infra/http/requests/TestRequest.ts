import Joi from 'joi';

import Request from '@shared/core/Request';

export default class TestRequest extends Request {

  protected static rules: Joi.ObjectSchema<any> = Joi.object({
    grade: Joi.number().required(),
    student_id: Joi.string().required(),
    form_id: Joi.number().required(),
  });

}
