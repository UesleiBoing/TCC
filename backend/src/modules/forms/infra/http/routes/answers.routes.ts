import { Router } from 'express';

import ensureAuthenticationTeachers from '@shared/infra/http/middlewares/ensureAuthenticationTeachers';

import AnswersController from '../controllers/AnswersController';

const answersRouter = Router();
const answersController = new AnswersController();

answersRouter.get('/', ensureAuthenticationTeachers, answersController.find);
answersRouter.post('/', ensureAuthenticationTeachers, answersController.create);
answersRouter.get('/:id', ensureAuthenticationTeachers, answersController.findOne);
answersRouter.put('/:id', ensureAuthenticationTeachers, answersController.update);
answersRouter.patch('/:id', ensureAuthenticationTeachers, answersController.update);
answersRouter.delete('/:id', ensureAuthenticationTeachers, answersController.delete);

export default answersRouter;
