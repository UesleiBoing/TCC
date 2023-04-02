import { Router } from 'express';

import ensureAuthenticationTeachers from '@shared/infra/http/middlewares/ensureAuthenticationTeachers';

import TeachersController from '../controllers/TeachersController';

const teachersRouter = Router();
const teachersController = new TeachersController();

teachersRouter.get('/', ensureAuthenticationTeachers, teachersController.find);
teachersRouter.post('/', teachersController.create);
teachersRouter.get('/:id', ensureAuthenticationTeachers, teachersController.findOne);
teachersRouter.put('/:id', ensureAuthenticationTeachers, teachersController.update);
teachersRouter.patch('/:id', ensureAuthenticationTeachers, teachersController.update);
teachersRouter.delete('/:id', ensureAuthenticationTeachers, teachersController.delete);

export default teachersRouter;
