import { z } from 'zod';

import Request from '@shared/core/Request';

export default class TestRequest extends Request {

  protected static schema = z.object({
    form_id: z.number(),
    student_id: z.number(),
    answers: z.array(
      z.object({
        description: z.number().optional(),
        question_id: z.number(),
      }),
    ),
  });

}
