import { Router } from 'express';

import ensureAuthenticationStudentsTeachers from '@shared/infra/http/middlewares/ensureAuthenticationStudentsTeachers';
import ensureAuthenticationTeachers from '@shared/infra/http/middlewares/ensureAuthenticationTeachers';

import QuestionsController from '../controllers/QuestionsController';

const questionsRouter = Router();
const questionsController = new QuestionsController();

questionsRouter.get('/', ensureAuthenticationStudentsTeachers, questionsController.find);
questionsRouter.post('/', questionsController.create);
questionsRouter.get('/:id', ensureAuthenticationStudentsTeachers, questionsController.findOne);
questionsRouter.put('/:id', ensureAuthenticationTeachers, questionsController.update);
questionsRouter.patch('/:id', ensureAuthenticationTeachers, questionsController.update);
questionsRouter.delete('/:id', ensureAuthenticationTeachers, questionsController.delete);

export default questionsRouter;
