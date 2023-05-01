import { Router } from 'express';

import ensureAuthenticationStudents from '@shared/infra/http/middlewares/ensureAuthenticationStudents';

const studentAnswersRouter = Router();

export default studentAnswersRouter;
