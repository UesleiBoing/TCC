import { z } from 'zod';

import Request from '@shared/core/Request';

export default class StudentRequest extends Request {

  protected static schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

}
