import { z } from 'zod';

import Request from '@shared/core/Request';

export default class SubjectRequest extends Request {

  protected static schema = z.object({
    title: z.string(),
    content: z.string(),
  });

}
