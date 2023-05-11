import { z } from 'zod';

import Request from '@shared/core/Request';

export default class AnswerRequest extends Request {

  protected static schema = z.object({
    description: z.string().max(1000),
    photo: z.string().optional(),
    order: z.number().optional(),
  });

}
