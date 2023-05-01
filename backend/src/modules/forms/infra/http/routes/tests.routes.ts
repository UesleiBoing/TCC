import { Router } from 'express';

import ensureAuthenticationStudentsTeachers from '@shared/infra/http/middlewares/ensureAuthenticationStudentsTeachers';

import TestsController from '../controllers/TestsController';

const testsRouter = Router();
const testsController = new TestsController();

testsRouter.get('/', ensureAuthenticationStudentsTeachers, testsController.find);
testsRouter.post('/', testsController.create);
testsRouter.get('/:id', ensureAuthenticationStudentsTeachers, testsController.findOne);
testsRouter.put('/:id', ensureAuthenticationStudentsTeachers, testsController.update);
testsRouter.patch('/:id', ensureAuthenticationStudentsTeachers, testsController.update);
testsRouter.delete('/:id', ensureAuthenticationStudentsTeachers, testsController.delete);

export default testsRouter;
