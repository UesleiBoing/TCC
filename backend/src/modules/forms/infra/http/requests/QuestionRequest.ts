import { z } from 'zod';

import Request from '@shared/core/Request';

export default class QuestionRequest extends Request {

  protected static schema = z.object({
    description: z.string(),
    type: z.number(),
    weight: z.number(),
    correct_answer: z.union([
      z.string().optional(),
      z.array(z.string()).optional(),
      z.array(z.number()).optional(),
    ]),
  });

}
