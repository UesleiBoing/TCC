import Joi from 'joi';

import Request from '@shared/core/Request';

export default class StudentAnswerRequest extends Request {

  protected static rules: Joi.ObjectSchema<any> = Joi.object({
    answer: Joi.string().required(),
    status: Joi.number().required(),
    question_id: Joi.number().required(),
    test_id: Joi.number().required(),
  });

}
