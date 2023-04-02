import { Router } from 'express';

import ensureAuthenticationStudents from '@shared/infra/http/middlewares/ensureAuthenticationStudents';

import StudentAnswersController from '../controllers/StudentAnswersController';

const studentAnswersRouter = Router();
const studentAnswersController = new StudentAnswersController();

studentAnswersRouter.get('/', ensureAuthenticationStudents, studentAnswersController.find);
studentAnswersRouter.post('/', studentAnswersController.create);
studentAnswersRouter.get('/:id', ensureAuthenticationStudents, studentAnswersController.findOne);
studentAnswersRouter.put('/:id', ensureAuthenticationStudents, studentAnswersController.update);
studentAnswersRouter.patch('/:id', ensureAuthenticationStudents, studentAnswersController.update);
studentAnswersRouter.delete('/:id', ensureAuthenticationStudents, studentAnswersController.delete);

export default studentAnswersRouter;
