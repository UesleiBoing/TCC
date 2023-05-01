import { z } from 'zod';

import Request from '@shared/core/Request';

export default class KeywordRequest extends Request {

  protected static schema = z.object({
    description: z.string(),
    topic_id: z.number(),
  });

}
