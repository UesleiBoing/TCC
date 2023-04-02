import { Router } from 'express';

import ensureAuthenticationStudents from '@shared/infra/http/middlewares/ensureAuthenticationStudents';

import TestsController from '../controllers/TestsController';

const testsRouter = Router();
const testsController = new TestsController();

testsRouter.get('/', ensureAuthenticationStudents, testsController.find);
testsRouter.post('/', testsController.create);
testsRouter.get('/:id', ensureAuthenticationStudents, testsController.findOne);
testsRouter.put('/:id', ensureAuthenticationStudents, testsController.update);
testsRouter.patch('/:id', ensureAuthenticationStudents, testsController.update);
testsRouter.delete('/:id', ensureAuthenticationStudents, testsController.delete);

export default testsRouter;
