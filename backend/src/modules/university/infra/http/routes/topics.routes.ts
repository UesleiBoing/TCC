import { Router } from 'express';

import ensureAuthenticationStudentsTeachers from '@shared/infra/http/middlewares/ensureAuthenticationStudentsTeachers';
import ensureAuthenticationTeachers from '@shared/infra/http/middlewares/ensureAuthenticationTeachers';

import TopicsController from '../controllers/TopicsController';

const topicsRouter = Router();
const topicsController = new TopicsController();

topicsRouter.get('/', ensureAuthenticationStudentsTeachers, topicsController.find);
topicsRouter.get('/:id', ensureAuthenticationStudentsTeachers, topicsController.findOne);
topicsRouter.get('/of-student/:student_id', ensureAuthenticationStudentsTeachers, topicsController.findByStudent);
topicsRouter.get('/:id/keywords', ensureAuthenticationStudentsTeachers, topicsController.findKeywords);
topicsRouter.get('/:id/questions', ensureAuthenticationStudentsTeachers, topicsController.findQuestions);
topicsRouter.post('/', ensureAuthenticationTeachers, topicsController.create);
topicsRouter.put('/:id/standard-form', ensureAuthenticationTeachers, topicsController.updateStandardForm);
topicsRouter.put('/:id', ensureAuthenticationTeachers, topicsController.update);
topicsRouter.patch('/:id', ensureAuthenticationTeachers, topicsController.update);
topicsRouter.delete('/:id', ensureAuthenticationTeachers, topicsController.delete);

export default topicsRouter;
