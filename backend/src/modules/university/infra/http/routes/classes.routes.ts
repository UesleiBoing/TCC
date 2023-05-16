import { Router } from 'express';

import ensureAuthenticationStudentsTeachers from '@shared/infra/http/middlewares/ensureAuthenticationStudentsTeachers';
import ensureAuthenticationTeachers from '@shared/infra/http/middlewares/ensureAuthenticationTeachers';

import ClassesController from '../controllers/ClassesController';

const classesRouter = Router();
const classesController = new ClassesController();

classesRouter.get('/', ensureAuthenticationStudentsTeachers, classesController.find);
classesRouter.get('/:id/rank', ensureAuthenticationStudentsTeachers, classesController.rankStudentsByGrade);
classesRouter.get('/of-student/:student_id', ensureAuthenticationStudentsTeachers, classesController.findByStudent);
classesRouter.get('/forms', ensureAuthenticationStudentsTeachers, classesController.findFormsStandards);
classesRouter.get('/:id', ensureAuthenticationStudentsTeachers, classesController.findOne);
classesRouter.post('/', ensureAuthenticationTeachers, classesController.create);
classesRouter.put('/:id', ensureAuthenticationTeachers, classesController.update);
classesRouter.patch('/:id', ensureAuthenticationTeachers, classesController.update);
classesRouter.delete('/:id', ensureAuthenticationTeachers, classesController.delete);

export default classesRouter;
