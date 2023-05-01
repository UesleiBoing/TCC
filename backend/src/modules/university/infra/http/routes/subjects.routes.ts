import { Router } from 'express';

import ensureAuthenticationStudentsTeachers from '@shared/infra/http/middlewares/ensureAuthenticationStudentsTeachers';
import ensureAuthenticationTeachers from '@shared/infra/http/middlewares/ensureAuthenticationTeachers';

import SubjectsController from '../controllers/SubjectsController';

const subjectsRouter = Router();
const subjectsController = new SubjectsController();

subjectsRouter.get('/', ensureAuthenticationStudentsTeachers, subjectsController.find);
subjectsRouter.get('/:id', ensureAuthenticationStudentsTeachers, subjectsController.findOne);
subjectsRouter.get('/of-student/:student_id', ensureAuthenticationStudentsTeachers, subjectsController.findByStudent);
subjectsRouter.post('/', ensureAuthenticationTeachers, subjectsController.create);
subjectsRouter.put('/:id', ensureAuthenticationTeachers, subjectsController.update);
subjectsRouter.patch('/:id', ensureAuthenticationTeachers, subjectsController.update);
subjectsRouter.delete('/:id', ensureAuthenticationTeachers, subjectsController.delete);

export default subjectsRouter;
