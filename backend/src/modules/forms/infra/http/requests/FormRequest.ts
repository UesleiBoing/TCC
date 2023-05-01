import { z } from 'zod';

import Request from '@shared/core/Request';

export default class FormRequest extends Request {

  protected static schema = z.object({
    title: z.string(),
    description: z.string(),
    topic_id: z.number(),
    order: z.number().optional(),
  });

}
