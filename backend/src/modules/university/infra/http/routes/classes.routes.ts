import { Router } from 'express';

import ensureAuthenticationStudents from '@shared/infra/http/middlewares/ensureAuthenticationStudents';

import ClassesController from '../controllers/ClassesController';

const classesRouter = Router();
const classesController = new ClassesController();

classesRouter.get('/', ensureAuthenticationStudents, classesController.find);
classesRouter.post('/', classesController.create);
classesRouter.get('/:id', ensureAuthenticationStudents, classesController.findOne);
classesRouter.put('/:id', ensureAuthenticationStudents, classesController.update);
classesRouter.patch('/:id', ensureAuthenticationStudents, classesController.update);
classesRouter.delete('/:id', ensureAuthenticationStudents, classesController.delete);

export default classesRouter;
