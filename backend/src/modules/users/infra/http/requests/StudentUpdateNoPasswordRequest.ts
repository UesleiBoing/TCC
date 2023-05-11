import { z } from 'zod';

import Request from '@shared/core/Request';

export default class StudentUpdateNoPasswordRequest extends Request {

  protected static schema = z.object({
    name: z.string(),
    email: z.string().email(),
    actual_password: z.string(),
  });

}
