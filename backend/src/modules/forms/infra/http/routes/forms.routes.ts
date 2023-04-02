import { Router } from 'express';

import ensureAuthenticationStudents from '@shared/infra/http/middlewares/ensureAuthenticationStudents';

import FormsController from '../controllers/FormsController';

const formsRouter = Router();
const formsController = new FormsController();

formsRouter.get('/', ensureAuthenticationStudents, formsController.find);
formsRouter.post('/', formsController.create);
formsRouter.get('/:id', ensureAuthenticationStudents, formsController.findOne);
formsRouter.put('/:id', ensureAuthenticationStudents, formsController.update);
formsRouter.patch('/:id', ensureAuthenticationStudents, formsController.update);
formsRouter.delete('/:id', ensureAuthenticationStudents, formsController.delete);

export default formsRouter;
