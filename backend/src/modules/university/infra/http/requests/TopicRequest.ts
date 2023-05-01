import { z } from 'zod';

import Request from '@shared/core/Request';

export default class TopicRequest extends Request {

  protected static schema = z.object({
    description: z.string(),
    order: z.number().optional(),
    class_id: z.number(),
  });

}
