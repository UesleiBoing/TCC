import { Router } from 'express';

import ensureAuthenticationStudents from '@shared/infra/http/middlewares/ensureAuthenticationStudents';
import ensureAuthenticationStudentsTeachers from '@shared/infra/http/middlewares/ensureAuthenticationStudentsTeachers';
import ensureAuthenticationTeachers from '@shared/infra/http/middlewares/ensureAuthenticationTeachers';

import FormsController from '../controllers/FormsController';

const formsRouter = Router();
const formsController = new FormsController();

formsRouter.get('/', ensureAuthenticationStudentsTeachers, formsController.find);
formsRouter.get('/of-student', ensureAuthenticationStudents, formsController.findFormsOfStudent);
formsRouter.get('/by-topic/:topic_id', ensureAuthenticationStudentsTeachers, formsController.findByTopic);
formsRouter.get('/:id', ensureAuthenticationStudentsTeachers, formsController.findOne);
formsRouter.post('/generate', ensureAuthenticationStudentsTeachers, formsController.generate);
formsRouter.post('/', ensureAuthenticationTeachers, formsController.create);
formsRouter.put('/:id', ensureAuthenticationTeachers, formsController.update);
formsRouter.patch('/:id', ensureAuthenticationTeachers, formsController.update);
formsRouter.delete('/:id', ensureAuthenticationTeachers, formsController.delete);

export default formsRouter;
