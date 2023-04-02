import { Router } from 'express';

import ensureAuthenticationStudents from '@shared/infra/http/middlewares/ensureAuthenticationStudents';

import QuestionsController from '../controllers/QuestionsController';

const questionsRouter = Router();
const questionsController = new QuestionsController();

questionsRouter.get('/', ensureAuthenticationStudents, questionsController.find);
questionsRouter.post('/', questionsController.create);
questionsRouter.get('/:id', ensureAuthenticationStudents, questionsController.findOne);
questionsRouter.put('/:id', ensureAuthenticationStudents, questionsController.update);
questionsRouter.patch('/:id', ensureAuthenticationStudents, questionsController.update);
questionsRouter.delete('/:id', ensureAuthenticationStudents, questionsController.delete);

export default questionsRouter;
