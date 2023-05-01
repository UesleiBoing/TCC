import { z } from 'zod';

import Request from '@shared/core/Request';

export default class ClassRequest extends Request {

  protected static schema = z.object({
    title: z.string(),
    content: z.string(),
    year: z.number().min(2022).max(2028),
    semester: z.number().min(1).max(2),
    teacher_id: z.number(),
    subject_id: z.number(),
  });

}
