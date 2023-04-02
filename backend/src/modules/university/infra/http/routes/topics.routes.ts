import { Router } from 'express';

import ensureAuthenticationStudents from '@shared/infra/http/middlewares/ensureAuthenticationStudents';

import TopicsController from '../controllers/TopicsController';

const topicsRouter = Router();
const topicsController = new TopicsController();

topicsRouter.get('/', ensureAuthenticationStudents, topicsController.find);
topicsRouter.get('/:id', ensureAuthenticationStudents, topicsController.findOne);
topicsRouter.post('/', topicsController.create);
topicsRouter.put('/:id', ensureAuthenticationStudents, topicsController.update);
topicsRouter.patch('/:id', ensureAuthenticationStudents, topicsController.update);
topicsRouter.delete('/:id', ensureAuthenticationStudents, topicsController.delete);

export default topicsRouter;
