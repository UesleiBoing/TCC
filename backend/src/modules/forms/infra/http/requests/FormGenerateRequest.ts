import { z } from 'zod';

import Request from '@shared/core/Request';

export default class FormGenerateRequest extends Request {

  protected static schema = z.object({
    order: z.number().min(5).max(30).optional(),
  });

}
