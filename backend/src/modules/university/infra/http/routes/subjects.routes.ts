import { Router } from 'express';

import ensureAuthenticationStudents from '@shared/infra/http/middlewares/ensureAuthenticationStudents';

import SubjectsController from '../controllers/SubjectsController';

const subjectsRouter = Router();
const subjectsController = new SubjectsController();

subjectsRouter.get('/', ensureAuthenticationStudents, subjectsController.find);
subjectsRouter.get('/:id', ensureAuthenticationStudents, subjectsController.findOne);
subjectsRouter.post('/', subjectsController.create);
subjectsRouter.put('/:id', ensureAuthenticationStudents, subjectsController.update);
subjectsRouter.patch('/:id', ensureAuthenticationStudents, subjectsController.update);
subjectsRouter.delete('/:id', ensureAuthenticationStudents, subjectsController.delete);

export default subjectsRouter;
