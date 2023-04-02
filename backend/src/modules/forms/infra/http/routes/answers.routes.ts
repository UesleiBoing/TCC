import { Router } from 'express';

import ensureAuthenticationStudents from '@shared/infra/http/middlewares/ensureAuthenticationStudents';

import AnswersController from '../controllers/AnswersController';

const answersRouter = Router();
const answersController = new AnswersController();

answersRouter.get('/', ensureAuthenticationStudents, answersController.find);
answersRouter.post('/', answersController.create);
answersRouter.get('/:id', ensureAuthenticationStudents, answersController.findOne);
answersRouter.put('/:id', ensureAuthenticationStudents, answersController.update);
answersRouter.patch('/:id', ensureAuthenticationStudents, answersController.update);
answersRouter.delete('/:id', ensureAuthenticationStudents, answersController.delete);

export default answersRouter;
