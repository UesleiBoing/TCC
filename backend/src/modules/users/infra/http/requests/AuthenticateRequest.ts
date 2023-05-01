import { z } from 'zod';

import Request from '@shared/core/Request';

export default class AuthenticationRequest extends Request {

  protected static schema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

}
