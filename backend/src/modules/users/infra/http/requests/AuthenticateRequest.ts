import Joi from 'joi';

import Request from '@shared/core/Request';

export default class AuthenticateRequest extends Request {

  protected static rules = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  public static async login({ email, password }: any): Promise<void> {
    super.protocolValidation({ email, password });
  }

}
